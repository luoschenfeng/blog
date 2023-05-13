# 转发

## 使用 unix 套接字

同一机器下的转发，使用 upstream 指令会利用 unix socket 提高性能。

```nginx
# /etc/nginx/nginx.conf
http {
  upstream koa {
    server localhost:8004;
  }
  include /etc/nginx/conf.d/*.conf;
}
```

```nginx
# /etc/nginx/conf.d/default.conf
server{
 location / {
    try_files $uri $uri/index.html @koa;
  }

  location @koa {
    proxy_set_header host $host;
    proxy_pass http://koa;
  }
}
```

默认情况下 nginx 转发默认会设置 host 为 `$proxy_host`(例子中为koa)，所以要用 `proxy_set_header` 覆盖默认的 host 设置才能拿到原始的 host。

