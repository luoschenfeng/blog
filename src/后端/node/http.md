# http

## http.createServer((req, res) => {})

return [`http.Server`](http://nodejs.cn/api/http.html#class-httpserver) 实例

callback 中 req 为 [`http.IncomingMessage`](http://nodejs.cn/api/http.html#class-httpincomingmessage)`

callback 中 res 为 [`http.ServerResponse`](http://nodejs.cn/api/http.html#class-httpserverresponse)`

```js {4}
const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.headers)
  let content = ''
  req.on('data', (chunk) => {
    content += chunk
  })
  req.on('end', () => {
    console.log(content)
    res.setHeader('content-type', 'text/plain')
    res.statusCode = 200
    res.end('response data')
  })
  
})
server.listen('3200',() => {
  console.log('listen 3200')
})
```

如上定义了一个 http 服务，每次等到拿到完整的响应实体再去生成响应 *response data*，注意 data 和 end 事件都要定义。回调开始执行就可以拿到 header 了，data 和 end 事件只是获取实体（即 ClientRequest 中 write 和 end 的数据）

## http.request(options[, (res) => {}])

return [`http.ClientRequest`  ](http://nodejs.cn/api/http.html#class-httpclientrequest)

callback 中 res 为 [`http.IncomingMessage`](http://nodejs.cn/api/http.html#class-httpincomingmessage)`

```js
const http = require('http')

const request = http.request({
  host: 'localhost',
  port: '3200',
  headers: {
    'content-length': 12
  }
}, (res) => {
    let content = ''
    res.on('data', function(chunk) {
      content += chunk 
    })
    res.on('end', function() {
      console.log(content)
    })
})
request.on('error', function (error) {
  console.log(error)
})
request.write('request data')
request.end()
```
一定要调用 end 表示完成发送请求。 对应上面的 server， 服务端打印 *request data*，客户端打印 *response data*
