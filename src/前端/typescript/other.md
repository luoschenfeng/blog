## `type` 与 `interface` 的区别

两者可以互相被代替，唯一的区别是 type 不能被重新定义，而 interface 可以被重新定义，来给同名的 interface 添加了新属性

两者都可被用于扩展

```ts
interface Animal {
  name: string
}

// interface 有extend、implement 操作
interface Bear extends Animal {
  honey: boolean
}
```

```ts
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}
```

上面两种写法都可以访问 name 和 honey 属性

```ts
const bear: Bear = getBear()

// bear.name
// bear.honey
```

只有 interface 可以在原有类型上添加属性

```ts
interface Animal {
  name: string
}

interface Animal {
  honey: boolean
}

const animal: Animal =  getAnimal()
// animal.name
// animal.honey
```

```ts
type Animal = {
  name: string
}

type Animal = {
  honey: boolean
}

// Error: Duplicate identifier 'Animal'.
```

## 类型断言（Type Assertions）

类型断言 可以使得类型转化成一个更加具体或不具体的类型。 `S` 和 `T` 类型， `S` 是 `T` 的子集， 或者 `T` 是 `S` 的子集，也就是两个类型有交集， 则 `S` 可以被断言成 `T`， `T` 也可以被断言成 `S`。

如果要 S 和 T 没有交集，要断言成功， 则要先断言成 `any` 或 `unkonwn`（因为所有类型都是这两个类型的子集）。

```ts
const t = ('t' as any) as S
```
 
类型断言书写的两种形式

```ts
const event = (new Event()) as MouseEvent
const event = <MouseEvent>(new Event())
```

但是由于在 jsx 中，会与模板写法发生冲突所以一般都用 `as` 进行申明

```jsx
<event>this is event component</event>
```

## 字面量类型

一个特定的 `number` 或 `string` 可以作为类型。这主要是为了实现const的作用

```ts
const a = 1
// const a: "1"

let a = 1
// let a: number
```

## 字面量类型推断

`let a = 1` 表示 a 是一个 `number` 类型，而不是被推断成 `1` 这个字面量类型, 要想让 a 是 `1` 这个字面量类型需要进行类型断言

```ts
let a = 1 as 1  // 一般会采用下面这种形式， 这种会被eslint格式化掉
let a = 1 as const
```

## 类型保护

- `typeof`、 `instanceof` 等进行判断

- `in`

- 利用类型谓词 `parameterName is Type` 自定义类型保护

```ts
interface Per {
  width: number
}

interface Bar {
  height: number
}

function getproperty(instance: Per | Bar): string {
  // 想要通过 width 属性 判断是哪个类型，必须要进行类型断言
  if ((instance as Per).width) {
    return 'per'
  } else {
    return 'bar'
  }
}

// 自定义类型保护
function isPer(instance: Per | Bar): instance is Per {
    // 返回Boolean类型
    return !!(instance as Per).width
}

function getproperty(instance: Per | Bar): string {
  if (isPer(instance)) {
    return 'per'
  } else {
    return 'bar'
  }
}
```
## 类型约束

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
}
```

上边代码看似会正常工作，实则不然， 虽然 return 值 `{ length: minimum }` 满足类型约束，但不一定是 Type 类型，比如运行下面代码， Type 是 array 类型。

```ts
const arr = minimumLength([1, 2, 3], 6);
```

## interface 申明函数

申明普通函数

```ts
interface FunA<T> {
    (arg: T): T
}
```

申明带有属性的函数

```ts
interface FunA<T> {
    (arg: T): T
    [property: string]: T
}
```

申明构造函数

```ts
interface FunA {
    new (arg: T): T
}
```

## 类型操作

`keyof`、 `typeof`、 `extends`、 `in keyof`

## 模块扩充

为 vue3 添加 $http 属性 
```ts
import axios from 'axios'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios
    $validate: (data: object, rule: object) => boolean
  }
}

```
