# 设置

## 日志输出

### 启用 koa 内部的日志输出

koa 使用 debug 库来输出日志，`const debug = require('debug')('koa:application')`, `namespace` 是 `koa:application`, 默认是关闭的，打开需要进行以下设置

```js
const debug = require('debug')
debug.enable('koa:application')
```

会在 listen 和 use 中间件时打印内部日志
