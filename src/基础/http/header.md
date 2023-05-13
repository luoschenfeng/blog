# 首部

## [connection](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection)

作用是用来在相邻的 http 应用之间传递信息的，包含首部字段时，表示此首部字段只在这相邻的 http 应用之间可用，不能转发出去，包含 close 表示此次连接之后立刻关闭此连接通道。

## [keep-alive](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive)

http 1.1 默认是持久性连接。
1.0 通过 connection: keep-alive,通知服务器保持持久性连接，如果服务器支持会在响应头里面也添加 connection: keep-alive, 并且可以通过 keep-alive 说明保持持久性连接的条件。

- 参数timeout是在Keep-Alive响应首部发送的。它估计了服务器希望将连接保持在活跃状态的时间。这并不是一个承诺值

- 参数max是在Keep-Alive响应首部发送的。它估计了服务器还希望为多少个事务保持此连接的活跃状态。这并不是一个承诺值

- Keep-Alive首部还可支持任意未经处理的属性，这些属性主要用于诊断和调试。语法为name [=value]

## 内容编码

对主体的编码方式，缩小主体的体积

### [accept-encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Encoding)

表明客户端支持的编码方式，如：

```http
Accept-Encoding: compress;q=0.5, gzip;q=1.0
```

其中 q 表示权重。


### [content-encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding)

表明服务器采用的内容编码方式

## 传输编码

相关文档

[TE](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/TE);

[Trailer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Trailer)


### [Transfer-Encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)

最新的HTTP规范只定义了一种传输编码，就是分块编码,通常是服务器不知道最终发送的主体的大小时所采用的方式，这种方式可以让服务器动态的生成内容，而不是将内容全部生成之后再发给服务器，减少了服务器的内存负担。

```js
// 内容编码 和 传输编码 同时使用
app.use(async ctx => {
    console.log(ctx.request.header)
    const gzip = createGzip();
    const source = fs.createReadStream(path.resolve(__dirname, './index.html'));
    ctx.response.status = 200
    ctx.response.set('Content-Type', 'text/html; charset=utf-8')
    ctx.response.set('Content-Encoding', 'gzip')
    return pipe(source, gzip, ctx.res);
});
```

:::tip
分块编码传输一个大小为 0 的 chunk 来表明数据已经传输完毕。
:::