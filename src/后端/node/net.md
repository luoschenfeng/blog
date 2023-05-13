# net

net 模块用于创建 `tcp` 或者 [`ipc`](http://nodejs.cn/api/net.html#ipc-support) 的服务端与客户端，创建的为 tcp 还是 ipc 与 listen 的参数有关  

## [net.createServer([options][, connectionListener])](http://nodejs.cn/api/net.html#netcreateconnection)

创建服务端。返回值为 [`net.Server`](http://nodejs.cn/api/net.html#class-netserver) 的实例

`connectionListener` 回调为 创建的 [`net.Server`](http://nodejs.cn/api/net.html#class-netserver) 实例的 connect 事件监听器，该函数的参数为 [`net.Socket`](http://nodejs.cn/api/net.html#class-netsocket) 的实例

```js
const net = require('net')

const server = net.createServer((socket) => {
  let content = ''
  socket.on('data',  (data) => {
    content += data
  })

  socket.on('end', () => {
    console.log(content)
    socket.end('response data')
  })
})

server.listen(3200, 'localhost', (err) => {
  console.log('server listen 3200')
})

server.on('error', (error => {
  console.log(error)
}))
```

如上代码创建了一个 tcp 服务端，当由请求时会打印 tcp 的应用层报文，并返回 *response data*。

### 创建一个简单的 http 服务

http 建立在 tcp 之上，其报文 分为头部和主体，之间用一个空行(\r\n)隔开。一下代码只是做了一下简单的处理，没有支持长链接 

```js
const net = require('net')

const server = net.createServer((socket) => {
  let header = ''
  let body = ''
  let message = ''
  socket.on('data',  (data) => {
    message += data.toString()
    // 这里简单处理一下，一般是要通过content-length去截取的
    if (message.includes('\r\n\r\n')) {
      let index = message.indexOf('\r\n\r\n')
      header = message.slice(0, index)
      body = message.slice(index + 4)
      socket.push(null)
    }
  })

  socket.on('end', () => {
    console.log('header:\r\n', header)
    console.log('body:\r\n', body)
    socket.write('HTTP/1.1 200 OK\r\n')
    socket.write('content-type: text/plain\r\n')
    socket.write('content-length: 13\r\n')
    socket.write('\r\n')
    socket.end('response data\r\n')
  })
})

server.listen(3200, 'localhost', (err) => {
  console.log('server listen 3200')
})

server.on('error', (error => {
  console.log(error)
}))

```

上面代码打印每次 http 请求的 header 和 body 并以 *response data* 响应。 

### 创建一个简单的 websocket 服务

详见 [这里](/后端/websocket/create-websocket.md)

## [net.createConnection(options[, connectListener])](http://nodejs.cn/api/net.html#netcreateconnectionoptions-connectlistener)

创建客户端。其创建新的 [`net.Socket`](http://nodejs.cn/api/net.html#class-netsocket) 的实例，并立即使用 socket.connect() 发起连接，返回值为 [`net.Socket`](http://nodejs.cn/api/net.html#class-netsocket) 的实例

`connectListener` 回调为 创建的 [`net.Socket`](http://nodejs.cn/api/net.html#class-netsocket) 实例的 connect 事件监听器，该函数是没有参数的

```js
const net = require('net')
let content = ''
const client = net.createConnection({
  port: 3200,
  host: 'localhost',
},() => {
  client.end('request data')
})

client.on('data',  (data) => {
  content += data
})

client.on('end', () => {
  console.log(content)
})


client.on('error', (error => {
  console.log(error)
}))
```

如上代码创建了一个 tcp 客户端，向 tcp 服务端发送 *request data*, 并打印这次请求的响应。
