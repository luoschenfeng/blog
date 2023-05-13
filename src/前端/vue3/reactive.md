# vue3响应式语法

- 为什么说 reactive 方法定义的对象解构、函数调用会失去响应式?

  是因为 reactive 使用的是 proxy，是作用于对象的，解构时会把值用 reactive再包一下，如果解构的值不是对象，就没有响应式了。换成 ref({ count: 0 }) 或者 reactive({value: {count : 0 }}) 就可以。其实可以看出 ref({ count: 0 }) 是 reactive({value: {count : 0 }}) 的语法糖

```js
const state = reactive({ count: 0 })

// 函数接受一个纯数字
// 并不会追踪 state.count 的变化
callSomeFunction(state.count)

// count 已经是一个
// 与 state 响应性失去连接的纯数字
let { count } = state
// 不会影响原状态
count++
```
