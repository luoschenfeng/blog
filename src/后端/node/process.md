# process

process 为全局变量，但建议使用模块引用

```js
const process = require('process')
```



## **process.cwd()**

返回当前脚本执行的文件目录， 而 `__dirname` 返回的是该文件所在的目录




## **process.env**

返回运行脚本时的环境变量， `process.env.NODE_ENV` 默认为 `undefined`



# **process.exit(code)**

方法指示 Node.js 以 `code` 的退出状态同步终止进程， 如果 code 未指定， 使用 process.exitCode || 0 退出（直到所有的 exit 事件回调执行完成后才会退出）。

```js
process.on('exit', function(code) {
  console.log(code)
})

process.exit(3)

// 3
```



## **process.exitCode**

默认为 `undefined`



## process.kill(pid[, signal])

将 signal 发送到 pid 标识的进程， 支持的 signal [列表](http://nodejs.cn/api/os.html#signal-constants)，默认为 `SIGTERM`，每个 signal 都有默认的行为，为 signal 添加事件回调，会覆盖掉其默认行为。

`SIGINT` 是以 ctrl + c 的形式退出进程发出的信号

```js
process.on('SIGTERM', () => {
  console.log(2)
})

setTimeout(() => {
  console.log(3)
},5000)


setTimeout(() => {
  console.log(1)
  process.emit('SIGTERM')
},2000)

// 1
// 2
// 3 SIGTERM 是安全的退出进程，所以要等到 3 打印之后才会退出(这里的退出是因为进程执行完成了，SIGTERM 的处理程序被覆盖掉了)
```



## process.nextTick(callback)

每当事件循环进行一次完整的行程时，我们都将其称为一个滴答。当将一个函数传给 process.nextTick() 时，则指示引擎在下一个嘀嗒开始前立刻调用此函数。这个执行时机还比任务队列（微任务）还靠前。
在一个嘀嗒中，执行 idle、 I/O、check 三个观察者，他们的执行顺序为 idle 先于 I/O，I/O 先于 check。其中  idle 执行由 process.nextTick() 添加的回调，I/O 一般执行微任务的回调，check 执行定时器回调。process.nextTick() 将回调添加到一个数组中，每次轮询会直接清空，I/O 操作会封装成一个请求对象，结果由其他线程返回，每次轮询会执行所有有结果的请求对象的回调，定时器将回调添加到一个链表中，每次轮询只执行链表中一个回调函数。 

:::tip
关于浏览器的事件循环，请参考 `javascript 忍着代码第二版`

---

setImmediate() 与 setTimeout(() => {}, 0) 比较相似， 按照上面的叙述，可以看出但他们比 process.nextTick() 慢得多。
:::

```js
setTimeout(function() {
  console.log(4)
}, 0)
new Promise((resolve, reject) => {
  resolve(3)
}).then((data) => {console.log(data)})

process.nextTick(function() {
  console.log(2)
})
console.log(1)

// 1
// 2 要比 promise 还快
// 3
// 4
```



## process.stderr; process.stdin; process.stdout



## 进程间通信

```js
// parent.js
const cp = require('child_process')


const child = cp.fork('./sub.js')

child.on('message', function (data) {
  console.log(data)
})

child.send('parent message')

// child.js

process.on('message', function (data) {
  console.log(data)
})

process.send('child message')

// parent message
// child message
```

依靠 send 可以发送句柄，可以让多个服务监听同一个端口

```js
//parent.js
const cp = require('child_process')
const net = require('net')

const child1 = cp.fork('./sub.js')
const child2 = cp.fork('./sub.js')

const server = net.createServer()
server.listen(3200, function () {
  child1.send('server', server)
  child2.send('server', server)
  server.close()
}) 

// child.js
const http = require('http')
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('content-type', 'text/plain')
  res.end(`process: ${process.pid}`)
})
process.on('message', (m, tcp) => {
  if (m === 'server') {
    tcp.on('connection',  (socket) => {
      server.emit('connection', socket)
    })
  }
})
```

node 多个进程有同一个文件标识符，可以监听同一个端口

## cluster

cluster 让开发者更容易实现多个进程监听一个端口，但没有 child_process 灵活

