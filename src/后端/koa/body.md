# 响应体的处理

## 中间件可以对 body 赋值，源代码如下

```js
set body(val) {
  const original = this._body;
  this._body = val;

  // no content
  if (null == val) {
    if (!statuses.empty[this.status]) this.status = 204;
    if (val === null) this._explicitNullBody = true;
    this.remove('Content-Type');
    this.remove('Content-Length');
    this.remove('Transfer-Encoding');
    return;
  }

  // set the status
  if (!this._explicitStatus) this.status = 200;

  // set the content-type only if not yet set
  const setType = !this.has('Content-Type');

  // string
  if ('string' === typeof val) {
    if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
    this.length = Buffer.byteLength(val);
    return;
  }

  // buffer
  if (Buffer.isBuffer(val)) {
    if (setType) this.type = 'bin';
    this.length = val.length;
    return;
  }

  // stream
  if (val instanceof Stream) {
    onFinish(this.res, destroy.bind(null, val));
    if (original != val) {
      val.once('error', err => this.ctx.onerror(err));
      // overwriting
      if (null != original) this.remove('Content-Length');
    }

    if (setType) this.type = 'bin';
    return;
  }

  // json
  this.remove('Content-Length');
  this.type = 'json';
},
```



## koa 调用中间件后会用 respond 处理 ctx.body，调用 res.end()，源代码如下

```js {3,48}
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' === ctx.method) {
    if (!res.headersSent && !ctx.response.has('Content-Length')) {
      const { length } = ctx.response;
      if (Number.isInteger(length)) ctx.length = length;
    }
    return res.end();
  }

  // status body
  if (null == body) {
    if (ctx.response._explicitNullBody) {
      ctx.response.remove('Content-Type');
      ctx.response.remove('Transfer-Encoding');
      return res.end();
    }
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' === typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
```

## 注意事项

- 如果想要手动的处理 res.end() 的逻辑，设置 `ctx.respond = false`(第3行代码) 即可，这意味这中间件中要调用 res.end()。因为 json 格式在 reponse 中才会计算 content-length，所以这个时候也要进行 conten—length 的处理。 

- 当要写入流时， 也可先将流赋值给 `ctx.body`，赋值时，会对该流定义 destory， 读取完成会自动销毁。此函数也会进行相应的处理（第47行），只有对可写流定义消费者时，才会产生数据，所以数据也不会丢失。

- set `ctx.body` 时会对设置的值进行类型判断（stream， json， string）。
  
  - 设置相应的 content-length。 其中 stream 使用 httpServer 默认的设置，会使用 `transfer-encoding: chunked` 来发送，不需要 content-length。

  - 设置相应的 content-type。其中 stream 设置为 bin，会转换成 `application/octet-stream`,所以要强制矫正；`string` 类型当首个字符为 `<` 判定为 `html`

  - body 不为 null 时设置 status 为 200。所以中间件中没有对 res 写入时， 会返回默认的 status 404。


