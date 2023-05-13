# 状态码

::: tip 
示例均为koa代码
```js
const Koa = require('koa')
const app = new Koa()
```
:::


## [300](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300)

表示有多个版本供客户端选择，一般返回一个html页面供客户端选择。服务端也可以指定 location 头部，提供最优选择,但在 chrome上，并没有对这个 location 有任何响应。

```js
app.use(async ctx => {
  ctx.response.status = 300,
  ctx.response.set('location', 'https://www.baidu.com/')
  ctx.response.body = '<a href="https://www.baidu.com">baidu</a></br><a href="https://www.m.baidu.com">m.baidu</a>'
});
```


## [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)

永久重定向,浏览器会缓存要重定向的 location，并且搜索引擎也会对资源的链接进行更新。 当 location 变化时需要清理缓存，才能定位到新的 location

```js
app.use(async ctx => {
  ctx.response.status = 301,
  ctx.response.set('location', 'https://www.baidu.com/')
});
app.listen('8000', '127.0.0.1')
```
如上当将新的 location 改为 ```https://www.baidu.com/```时，要清除 ```127.0.0.1:8000```的缓存


## [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)

暂时重定向，搜索引擎不会对资源的链接进行更新。也不会缓存，每次都会根据 location 进行重定向

```js
app.use(async ctx => {
  ctx.response.status = 302,
  ctx.response.set('location', 'https://douban.com/')
});
app.listen('8000', '127.0.0.1')
```
如上当 location 变化时会重定向到新的链接，不用清除缓存。

## [303](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/303)

see other,通常是 put, post提交完数据要跳转的页面（由 location 指定）。不常用，一般由 javascript 进行跳转

```js
app.use(async ctx => {
  ctx.response.status = 303,
  ctx.response.set('location', 'https://douban.com/')
});
```

## [304](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/304)

not modified,表示资源未修改。客户端与服务端协商缓存时，服务端用此来表示客户端缓存的内容未修改

```js
app.use(async ctx => {
  let stat = fs.statSync(path.resolve(__dirname, './index.html'))
  let modifySince = ctx.request.header['if-modified-since']
  if(!modifySince ||  new Date(modifySince).getTime() < new Date(stat.mtime).setMilliseconds(0)) {
    ctx.response.status = 200
    let data = fs.createReadStream(path.resolve(__dirname, './index.html'))
    ctx.response.set('last-modified', new Date(new Date(stat.mtime).setMilliseconds(0)))
    ctx.response.set('content-type', 'text/html')
    ctx.body = data
  } else {
    ctx.response.status = 304
  }
});
```

上例为 last-modified 协商缓存，首次请求，服务端在请求头部中未接受到 if-modified-since，响应的状态码为 200，并在响应头部添加 last-modified，值为文件最新的修改时间，客户端缓存响应的内容，并在接下来的请求中把 last-modified 对应的值添加到 if-modified-since 头部中，服务端拿到  if-modified-since 的值之后，会和文件最新的修改时间作比较，如果相等，表示客户端缓存的是最新版本，返回 304 状态码。

:::tip
可以看出， last-modified 只能精确到秒，在实践一般和其他缓存策略共同使用
:::

## [305](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/305)

Use Proxy，用来说明必须通过一个代理来访问资源；代理的位置由Location首部给出。

## [307](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/307)

暂时重定向（1.1版本），与 [302](#_302) 的区别是保证重定向后的主体和方法不会改变。

## [308](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/308)

永久重定向（1.1版本），与 [301](#_301) 的区别是保证重定向后的主体和方法不会改变。

## [400](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/400)

Bad Request， 客户端请求语法错误，经常用来表示客户端请求的参数错误(成员及数据类型)。

## [401](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401)

Unauthorized，质询与应答的客户端验证方案。当服务端未收到凭证时返回 401 状态码，并在 WWW-Authenticate 首部提供如何进行验证的信息，客户端在 Authorization 请求头部中提供身份验证凭证。

## [402](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/402)

Payment Required

:::tip
本小节其余部分只有付费用户才能阅读
:::

## [403](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/403)

Forbidden，指的是服务器端有能力处理该请求，但是拒绝授权访问。与 [401](#_401) 的区别是没有验证的步骤

## [404](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/404)

Not Found,代表客户端错误，指的是服务器端无法找到所请求的资源。

## [405](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/405)

Method Not Allowed，返回头部因该包含 allow 头部表明服务器支持的方法

## [406](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/406)

Not Acceptable,内容协商错误，服务端没有客户端所要求的资源版本

## [407](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/407)

Proxy Authentication Required,与 [403](#_403) 类似，质询与应答的代理验证方案。当服务端未收到凭证时返回 407 状态码，并在 proxy-Authenticate 首部提供如何进行验证的信息，代理在 proxy-Authorization 请求头部中提供身份验证凭证。

## [408](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/408)

Request Timeout，如果客户端完成请求所花的时间太长，服务器可以返回此状态码，并关闭连接。超时时间是可配置的。

## [409](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/409)

Conflict，服务器担心请求会引发冲突时，可以发送此状态码。响应中应该包含描述冲突的主体。冲突最有可能发生在对 PUT 请求的响应中。例如，当上传文件的版本比服务器上已存在的要旧，从而导致版本冲突的时候，那么就有可能收到状态码为 409 的响应。

## [410](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/410)

Gone，说明请求的目标资源在原服务器上不存在了，并且是永久性的丢失，主要用于Web站点的维护。

## [411](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/411)

Length Required，客户端错误，客户端需要发送 content-length

## [412](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/412)

Precondition Failed，表示客户端错误， 当资源在未修改的情况下，服务器返回请求的资源，当服务器判断资源已经修改则会返回 412。通常是 [If-Unmodified-Since](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Unmodified-Since) 或 [If-None-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-None-Match) 先决条件不成立时。

## [413](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/413)

Request Entity Too Large 

## [414](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/414)

Request URI Too Long 

## [415](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/415)

Unsupported Media Type,表示服务器由于不支持其有效载荷的格式，从而拒绝接受客户端的请求。

## [416](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/416)

Requested Range NotSatisfiable，服务器无法处理所请求的数据区间。

Expectation Failed，客户端错误，意味着服务器无法满足 [Expect](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expect) 请求消息头中的期望条件。

## [500](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/500)

Internal Server Error，服务器内部逻辑出现错误

## [501](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/501)

Not Implemented，服务器错误响应码表示请求的方法不被服务器支持，经常用到服务器开发过程中。 而 [405](#_405) 表示是客户端所用的方法有误，

## [502](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/502)

Bad Gateway，它表示作为网关或代理角色的服务器，从上游服务器（如tomcat、php-fpm）中接收到的响应是无效的。通常用来表示网关不能理解其请求的内容

## [503](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/503)

Service Unavailable，它表示服务器尚未处于可以接受请求的状态。通常造成这种情况的原因是由于服务器停机维护或者已超载。注意在发送该响应的时候，应该同时发送一个对用户友好的页面来解释问题发生的原因。该种响应应该用于临时状况下，与之同时，在可行的情况下，应该在 [Retry-After](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Retry-After) 首部字段中包含服务恢复的预期时间。

## [504](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/504)

Gateway Timeout, 与状态码408类似，只是这里的响应来自一个网关或代理，它们在等待另一服务器对其请求进行响应时超时了。

## [505](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/505)

HTTP Version Not Supported，服务器收到的请求使用了它无法或不愿支持的协议版本时，使用此状态码。有些服务器应用程序会选择不支持协议的早期版本



