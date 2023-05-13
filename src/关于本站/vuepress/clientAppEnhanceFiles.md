# clientAppEnhanceFiles hooks

`clientAppEnhanceFiles` `hooks` ,由命名就可以看出是增强客户端功能的。在插件配置中可以这样申明：

```js
// .vuepress/plugin/AppPlugin
module.exports = {
  name: 'ajax',
  clientAppEnhanceFiles: path.resolve(__dirname, './ClientAppEnhance/ajax.js'),
}
```

在 `./ClientAppEnhance/ajax.js` 中可以使用 [defineclientappenhance](https://v2.vuepress.vuejs.org/zh/reference/client-api.html#defineclientappenhance) helper函数来完成功能的实现

```js
// ./ClientAppEnhance/http.js
import axios from 'axios'
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.$http = axios.create({
    //...
  }) 
})
```

传参 `app` 为客户端vue实例，因此可以挂载全局的属性、组件等，其他参数说明参考[这里](https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-app-enhance.html)
