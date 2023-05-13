# 概述

## 插件的作用

- `vuepress` 是用了 [tapable](https://github.com/webpack/tapable)实现的插件机制, 和 `webpack` 相似。在生命周期中会执行相应的 `hooks` , 如 `extendsPageOptions` `hooks` 会在 `load pages` 生命周期中执行;插件可以向 `hooks` 注册函数,当这些 `hooks` 触发的时候,注册的函数就会被执行;注册函数对参数进行操作(参数与 `hooks` 的类型有关)改变客户端拿到的值,从而影响页面最终渲染的结果。

:::warning
- `formatter` 分为 `theme` `formatter` 和 `page` `formatter`, 插件的hooks可以修改 `page` `formatter` 
:::
