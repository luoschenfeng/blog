# 生成器

## 生成器函数

[`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) 用来定义一个生成器函数。

调用生成器函数，不会马上执行它里面的语句，而是返回一个[生成器迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)，调用这个对象的 `next` 方法，才会执行 生成器函数里面的语句。

## [yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)

调用生成器迭代对象 `next` 方法执行函数时， `yield` 关键字使生成器函数执行暂停，`yield` 关键字后面的表达式的值被包装成 `IteratorResult` 对象返回给生成器的调用者。

`IteratorResult` 对象，它有两个属性，`value` 和 `done`。`value` 属性是对 `yield` 表达式求值的结果，而 `done` 是 `false`，表示生成器函数尚未完全完成

```js
function * a () {
  yield 1;
  yield 2;
}

const b = a()

b.next() // { value: 1, done: false }
b.next() // { value: 2, done: false }
b.next() // { value: undefined, done: true }
```

:::tip
即使 `function*` 生成器函数 里面没有 `yield`， 他也会返回一个迭代对象, 由于没有 `yield` 的阻断，执行一次 `next` 就会执行完成

```js
function* a() {
  console.log(1)
}

const b = a()

b.next() // { value: undefined, done: true }

// 1
```
:::

- [yield*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)

`yield*` 后面跟的表达式结果要是一个可迭代对象, `yield*` 每次只会返回可迭代对象的一个值

`yield*` 表达式本身的值是当迭代器关闭时返回的值（即 `done` 为 `true `时）。

```js
function * a () {
  yield 1;
  yield 2;
}


function * b (value) {
  if (value) {
    yield * a()
  }
  yield 3
}

const c = b()

c.next() // { value: 3, done: true }
c.next() // { value: undefined, done: true }

const d = b(true)

d.next() // { value: 1, done: true }
d.next() // { value: 2, done: true }
d.next() // { value: 3, done: true }
d.next() // { value: undefined, done: true }
```

:::tip
当 `yield*` 后面的生成器迭代对象，没有被 `yeild` 暂停时 ，当前函数不会被中断，会继续执行 `yield*` 后面的语句

```js
function* a() {
  console.log(1)
}

function* b() {
  yield* a();
  yield 1;
}

const c = b()

console.log(c.next()) // { value: 1, done: false }

// 1
```
:::





