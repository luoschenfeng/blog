# condition

## extends

成立的依据是左边继承右边,(左边可分配给右边，大多数情况是适用的)

如果左边是 any时得到的是联合类型


```ts
// typeA: boolean | number
type typeA = any extends never ? boolean : number

```

```ts
type T30<T> = unknown extends T ? true : false; // Deferred
type T31<T> = T extends unknown ? true : false; // Deferred (so it distributes)
type T32<T> = never extends T ? true : false; // true
type T33<T> = T extends never ? true : false; // Deferred
```

最后的结果是所有可能性的集合
```ts
type T1<T> = T extends true ? true : false
type T2 = T1<boolean> //boolean
```
## 分发

`extends` 与 泛型可以生成新的类型

```ts
type ToArray<Type> = Type extends any ? Type[] : never

// type stringToArray = string[]
type stringToArray = ToArray<string>

//type strOrNumArray = string[] | number[]
type strOrNumArray = ToArray<string | number>

```

当泛型 `Type` 是联合类型时默认情况下会发生分发

```ts
// type strOrNumArray = string[] | number[]
type strOrNumArray = string[] | number[]
```

为了避免分发可以将将 `extends` 两边用方括号 ([]) 括住

```ts
type ToArray<Type> = [Type] extends [any] ? Type[] : never

//type strOrNumArray = (string | number)[]
type strOrNumArray = ToArray<string | number>

```
