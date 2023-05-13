# koa 的错误处理

koa 的错误处理使用的是 [http-error](https://github.com/jshttp/http-errors), 在 ctx 中处理需要调用 `ctx.throw`.传入相应的 statusCode 及 msg ， 会构造一个 httpError

构造的 httpError 属性有 message，name，stack，export，status，statusCode。