# buffer

`buffer`  是 node 中的数据缓存区，继承自 javascript 的 `Uint8Array`, 在 node 中 `buffer` 和 `Uint8Array` 是互相通用的。 buffer 可以全局访问， 但建议通过引用 buffer 模块来访问(通常只引用 buffer 模块的 Buffer 类)。

```js
const { Buffer } = require('buffer')
let buffer = Buffer.alloc()
```


## 声明buffer


### Buffer.alloc(size[, fill[, encoding]])

*size:* 声明 buffer 的字节长度

*fill:* buffer 的初始化时每个字节预填充的值，String | Buffer | Uint8Array | Integer  **默认值: 0**

*encoding:* 设置 fill 为字符串时的编码形式，**默认值: utf8**, [支持的编码](http://nodejs.cn/api/buffer.html#buffers-and-character-encodings)

如果指定了 fill 则用 [Buffer.fill](http://nodejs.cn/api/buffer.html#buffillvalue-offset-end-encoding) 进行填充

- **length**

```js
let buffer = Buffer.alloc(10) // 声明一个长度为10字节的内存
```

- **Integer**

```js
let buffer = Buffer.alloc(10, 2)
```

- **string**

```js
const buf1 = Buffer.alloc(5, '123') // <Buffer 31 32 33 31 32>  0x31 -> 49 -> 1
const buf1 = Buffer.alloc(10, 'gggg', 'base64') 
// <Buffer 82 08 20 82 08 20 82 08 20 82>  要大于一个字节，否则抛出异常，余后的位数直接截断.这里的截断fill方法称为无效字节，进行低位截断
```

- **buffer**

```js
const buf1 = Buffer.alloc(5, '123') // <Buffer 31 32 33 31 32>  0x31 -> 49 -> 1
const buf2 = Buffer.alloc(8, buf1)  // <Buffer 31 32 33 31 32 31 32 33>
```


## Buffer.allocUnsafe(size)  Buffer.allocUnsafeSlow(size)  

从预先分配的内存池中分配内存


## Buffer.from

- **Buffer,from(array)**

*array:* integer[]

array 每项的取值范围时 0 ～ 255 ，不再此范围的数字会进行截断（item & 255）

```js
const buf1 = Buffer.from([510])  // <Buffer fe>  0xfe -> 254 == 510 & 255
```

- **Buffer.from(string[, encoding])**

余出的字节会被截断（截断方法于fill方法类似）， 少于1个字节会截断成空（alloc会报错）

```js
buf = Buffer.from('aff', 'hex')
// <Buffer af>
buf = Buffer.from('a', 'hex')
// <Buffer >
```

- **Buffer.from(ArrayBuffer[, byteOffset[, length]])**

*ArrayBuffer:*  ArrayBuffer | SharedArrayBuffer

*byteOffset:*  字节的索引

*length:*  字节长度

范围不能超过 ArrayBuffer 的范围

```js
arrayBuffer = Uint8Array.from('123').buffer
// ArrayBuffer { [Uint8Contents]: <01 02 03>, byteLength: 3 }
Buffer.from(arrayBuffer, 1)
// <Buffer 02 03>
/ Buffer.from(arrayBuffer, 1, 3)
// Error
```

- **Buffer.from(buffer)**

```js
const buf1 = Buffer.alloc(8, 1)
const buf2 = Buffer.alloc(buf1)
```

- **Buffer.from(object[, offsetOrEncoding[, length]])**

*object:* 具有valueOf 或  Symbol.toPrimitive 方法的对象

*offsetOrEncoding:* 字节偏移量或编码 (buffer 类型指定偏移量 ，string 类型指定编码)

*length:* 插入的长度 （然而无论是 string 或 buffer 并没有起作用，而是全部复制过来）

```js
const obj1 = {valueOf() { return Buffer.alloc(8, 'a')}}
// Buffer.alloc(8, 'a') -> <Buffer 61 61 61 61 61 61 61 61>
const buf1 = Buffer.from(obj1, 0, 3)
// <Buffer 61 61 61 61 61 61 61 61>
```
