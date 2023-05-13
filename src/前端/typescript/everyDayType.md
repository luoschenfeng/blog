# everyDayType

# any, never, unkonwn的区别

- any 

`typescript` 中 可以对 `any` 进行任何合法的操作。可以将任何类型分配给 `any`，也可以将 `any` 类型分配给任何其他类型

```ts
type typeA = any

let a: typeA = 1

a = ''

const c: number = a
```

- never

`never` 是用来表示在约束情况下，不存在状态的类型。可以将 `never` 类型分配给其他类型,  但不能将其他类型(除了 `never`)分配给 `never` 类型


```ts
function getData(key: number | string): void {
  if (typeof key === 'string') {
    console.log('')
  } else if (typeof key === 'number') {
    console.log(0)
  } else {
    // var1 类型为 never
    let var1 = key
    
    // var1 = 1 不能将其他类型分配给 never,(此时 any类型也不行)
    console.log(var1)
  }
}

getData('')

```

在表示一个函数返回时，使用 `never` 表示该函数没有返回（会抛出错误或终止程序）

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
``` 

由于 never 是一个不存在的类型，其他类型与其联合，仍是其他类型

```ts
type typeA = string | never // typeA : string
```

- unkonwn

`unknown` 类似与 `any`, 是 `any` 的安全类型， 可以将其他类型分配给 `unknown` 类型， 并且`unknown` 类型只能分配给他自己，不能对其进行其他合法操作， 这和 `never` 恰好相反 

通常用在函数入参中，表示可以接受除 `any` 的任何类型，在函数体中再进行类型收缩, 进行安全操作

```ts
function printValue (value: unknown): string {
  if (typeof value === 'number') {
    // 此时可以安全的操作
    value = value.toFixed(2)
    return value as string
  } else {
    return String(value)
  }
}
```

