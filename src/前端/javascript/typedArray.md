# 定型数组

## ArrayBuffer

通过 `ArrayBuffer` 可以分配一段连续的内存， 被称为数据缓存区。需要通过类型数组或者视图操作这段数据缓存区。

```js
const buffer = new ArrayBuffer(10) //  10字节长度的数组
```

## DataView

ArrayBuffer 必须要通过视图进行读写,实例化一个视图 `new DataView(buffer[, start, end])`

实例提供很多操作 buffer 的属性和方法，详细说明详见[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView#constructor)，如 Uint8 就表示一个位置占一个字节，取值范围为 0～255。

```js
const buffer = new ArrayBuffer(10) //  10字节长度的数组
const view = new DataView(buffer, 0, 10) //  左闭右开， 不能超过 buffer 的范围，否则会报错

view.setUint8(0, 128)

view.getInt8(0) // -128 (设置的是源码，读取的是相应的补码)
```

:::tip 注意
视图是操作字节的，设置值时必须在其取值范围内， 比如 Uint8 的取值范围为0～255， 如果设置为范围外的 Integer  `value & 255`,如果设置的为**非** Integer 类型，会取value.valueOf() 进行设置。如果valueOf不是数字，则结果为0.

```js
view.setUint8(0, 1)
view.setUint8(1, '1')
view.setUint8(2, '256')
view.setUint8(3, {valueOf() {return 2}})
view.setUint8(4, 4)
view.setUint8(4, 'a')
```

结果
```js
{
  byteLength: 10,
  byteOffset: 0,
  buffer: ArrayBuffer {
    [Uint8Contents]: <01 01 00 02 00 00 00 00 00 00>,
    byteLength: 10
  }
}
```

如上图，设置第4个字节为 ‘a’ 时，valueOf 不是数字， 最终设置为 0。
:::

## typedArray(定型数组)

在创建一个 typedArray 时，就会创建一个 ArrayBuffer。typedArray 也有好几种形式，详情见[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#typedarray_objects)

创建一个 typedArray 实例有好几种方式。

### new

- 接收一个 intergre

```js
const typedArray = new Uint16Array(10) // 接收一个数字，表示创建 长度为 10 的 Uint16

typedArray.byteLength // 20 （一个Uint 为两个字节 ， 所以 byteLength 为 20）

```

- 接收一个类数组(可以是有 length 属性的 对象),这种方式创建类似于 Array.from()

```js
const typedArray1 = new Uint16Array([1, 2])

const typedArray = new Uint16Array({length: 10}) // 结果和接收一个 length 类似
```

- 接收其他 typedArray

```js
const typed16Array = new Uint16Array({length: 10})

const typed8Array = new Uint8Array(typed16Array) //  此时 byteLength 为 20
```

- 接收一个 buffer (new TypedArray(buffer, byteOffset, length))

```js
const arrayBuffer = new ArrayBuffer(10)

const typedArray = new Uint16Array(arrayBuffer, 10, 1) // Error
```

:::tip
如上创建 Uint16Array 时 length 一定要为 16 的倍数，所占的位置 要在 buffer 的范围内
:::

- **TypedArray.from**

用法类似于 [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#parameters), 区别在于只接受范围内的 Integer, 如果不是Integer，处理方式类似于 [DataView](#dataview)

```js
const a = Uint8Array.from([1, 2, 'a']) // Uint8Array(3) [ 1, 2, 0 ]
```

- **TypedArray.of**

用法类似于 [Array.of()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of), 区别在于只接受范围内的 Integer, 如果不是Integer，处理方式类似于 [DataView](#dataview)

```js
const a = Uint8Array.of(1, 2, 'a') // Uint8Array(3) [ 1, 2, 0 ]
```
