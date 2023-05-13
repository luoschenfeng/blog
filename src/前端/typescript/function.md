# function

- 利用函数对返回值类型进行限制

```ts
type typeA = (arg: any) => {
  a: string
}

const funA: typeA = (arg) => {
  return arg
}
```
