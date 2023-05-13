# 创建一个 websocket 服务

websocket 建立在 tcp 之上，分为握手阶段和连接阶段。

## 握手阶段

握手阶段是通过 http 来完成的，首先服务端需要建立一个 http 服务（代码如下）。

```js
// http-server.js
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  let content = ''
  req.on('data', (chunk) => {
    content += chunk
  })
  req.on('end', () => {
    const readStream = fs.createReadStream('./dir/index.html')
    res.setHeader('content-type', 'text/html')
    res.statusCode = 200
    readStream.pipe(res)
  })

})
server.listen('3201',() => {
  console.log('listen 3201')
})
```

```html
<!-- index.html -->
<script>
    var socket = new WebSocket('ws://localhost:3200');
    socket.onopen = function () {
      socket.send('abc');
    };
    socket.onmessage = function (event) {
      console.log(event.data)
    };
</script>
```

以上代码服务端建立 http 服务， 浏览器访问 *localhost:3201*,时服务端响应 *index.html*, 然后浏览器解析并执行其中的脚本，与 localhost:3200（Websocket支持跨域）建立 WebSocket 服务。接下来看一下服务端是怎样实现握手的。
浏览器与 3200 端口建立 websocket 服务，首先会发送握手请求（通过http），如下是 websocket 服务端的代码，打印了握手请求（chrome）的头部和主体

```js
const net = require('net')
const crypto = require('crypto')
const { Buffer } = require('buffer')
const { EventEmitter } = require('events')

const server = net.createServer((socket) => {
  let header = ''
  let body = ''
  let message = ''
  socket.on('upgrade', () => {
    const reqKey = /(?<=Sec-WebSocket-Key:\s+)(?:\S)*/.exec(header)[0]
    const acceptKey = crypto.createHash('sha1').update(reqKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
    socket.write('HTTP/1.1 101 Switching Protocols\r\n')
    socket.write('Upgrade: websocket\r\n')
    socket.write('Connection: Upgrade\r\n')
    socket.write(`Sec-WebSocket-Accept: ${acceptKey}\r\n`)
    socket.write('\r\n')
    const websocket = new Websocket(socket)
  })

  socket.once('data',  (data) => {
    message += data.toString()
    // 这里应该用content-length 截取
    if (message.includes('\r\n\r\n')) {
      let index = message.indexOf('\r\n\r\n')
      header = message.slice(0, index)
      body = message.slice(index + 4)
      if(header.includes('Upgrade')) socket.emit('upgrade')
    }
  })
})

server.listen(3200, 'localhost', (err) => {
  console.log('server listen 3200')
})

server.on('error', (error => {
  console.log(error)
}))
```

header 打印如下, body 为空

```http
GET / HTTP/1.1
Host: localhost:3200
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
Upgrade: websocket
Origin: http://localhost:3201
Sec-WebSocket-Version: 13
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,ja;q=0.6
Sec-WebSocket-Key: BcVbtgbkG+YnCD9NRv23qA==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```
其中
```
Connection: Upgrade
Upgrade: websocket
```
这两个字段请求服务端切换协议为 WebSocket。Sec-WebSocket-Key: BcVbtgbkG+YnCD9NRv23qA== 用于安全校验，是随机生成的 Base64 编码的字符串。服务端接收到之后，要将其与字符串 ***258EAFA5-E914-47DA-95CA-C5AB0DC85B11*** （GUID，是个常量）相连，本例中形成字符串 BcVbtgbkG+YnCD9NRv23qA==258EAFA5-E914-47DA-95CA-C5AB0DC85B11，然后通过 sha1算法加密，再编码成 Base64 字符串，最后通过 `Sec-WebSocket-Accept` 响应头部返回给客户端。具体步骤详见[这里](https://datatracker.ietf.org/doc/html/rfc6455)。

这时服务端触发 update 事件（如上面的代码），返回状态码为 101 的响应（如下），表示连接成功。至此握手完成，客户端触发 open 事件

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: RVP0IJR2K6QBsWRTqoIruP3KBdk=
```

## 连接阶段

连接阶段，浏览器和服务端就可以通过 websocket 传送数据了，浏览器发送的数据是通过[掩码处理](https://datatracker.ietf.org/doc/html/rfc6455#section-5.3)过的，这里就不详细介绍 WebSocket 数据的[结构](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2)了。
具体看一下服务端 WebSocket 类的实现。

```js
class Websocket extends EventEmitter {
  constructor(socket) {
    super()
    this.socket = socket
    this.socket.on('data',  (data) => {
      const buf = Buffer.alloc(5)
      buf[0] = 129   // 表示为文本传输
      buf[1] = 3     // 没有掩码处理，主体长为3
      buf[2] = 100   // d
      buf[3] = 101   // e
      buf[4] = 102   // f
      this.send(buf)
    })
  }
  send(data) {
    this.socket.write(data)
  }
}
```

服务端发送的数据是不用掩码处理，以上代码略过了接受到浏览器掩码数据的解析，无论浏览器发送什么数据过来，都以字符串 *def* 作为回应，浏览器通过 message 事件接收到服务端响应的数据，结果如下。

![websocket result](/images/websocket-result.png)
