# workspace

:::tip
workspace 只能用于私有包
:::

主工程有以下配置

```json
 // package.json
  "main": "index.js",
  "license": "MIT",
  "workspaces": [
    "packages/*"
  ],
  "private": "true"
```

```js
// index.js
const aa = require('@test/aa')
```

如果 packages 目录下面有模块 aa 的 package.json 的 name 属性为 `@test/aa`，安装项目依赖时，会在 node_modules 中创建  `@test/aa` -> `packages/aa` 的软链接，

index.js 中绝对引用 '@test/aa' 时，查找 node_modules, 最终引用的为 packages/aa 的内容

:::
如果主工程中有同名的第三方依赖， 则不会建立软链接。

```json {10-12}
// package.json
{
  "name": "workspace",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "workspaces": [
    "packages/*"
  ],
  "dependencies": {
    "aa": "1.0.0"
  },
  "private": "true"
}
```
:::
