# typeof

## typeof 进行类型约束

## typeof 生成联合类型

```ts
export const componentSizes = ['', 'default', 'small', 'large'] as const

//type ComponentSize = "" | "default" | "small" | "large"
export type ComponentSize = typeof componentSizes[number]
```
