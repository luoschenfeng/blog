# 缓存

## [last-modified](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified) 与 [if-modified-since](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Modified-Since)

详情见 [status 304](./status.md#_304) ,可以看出示例代码将毫秒设置为 0，是因为多数浏览器头部时间只能精确到秒，并且每次还需要向后端发送验证请求，有些操作系统或软件在本地文件内容未修改的情况下修改时间也会变化。

## [ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag) 与  [If-None-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-None-Match)

ETag 的值可以像散列这种的强验证，也可以是版本号这种弱验证(内容改变但版本号不一定改变)

```http
ETag: W/"<etag_value>" 
ETag: "<etag_value>"
```

这种缓存方案解决了时间精度的问题，但还是每次要发送请求。有没有不用向后端请求验证直接使用缓冲的内容呢？

## [Expires](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)

这种方案不用向服务端进行验证，但前后端时钟不同步，精确度不够。

## [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

最终的解决方案，接受的参数较多，使用 max-age 时，表示的是服务器生成请求之后的一段时间缓冲有效。

## 清除缓存

[Expires](#_Expires) 和 [Cache-Control](#_Cache-Control) 带来了另外一个问题就是未到过期时间，怎样让客户端清除掉原来缓存的文件使用最新版本的文件？

方法是在每个资源链接后面加上查询字符串，每次发布新版本时替换一下这个字符串，这样就会使用新的连接访问原先的资源，但这还有一个问题，没有最大化的使用用户的缓存，内容没有变化的资源，请求的链接也会变换，这些资源本可以使用本地缓存的。

解决上述问题，是依据资源内容生成自己的链接查询字符串，或者依据内容生成链接，一般会使用前端的打包工具webpack、esbuild等实现此功能。


