# fs

本节的 fs 为 promise api

```js
const fs = require('fs/promises')
```


## fs.open(path[, flags, mode])

打开文件

**arguments**

*path：* Buffer | String | URL

*flags：* [可用的值](http://nodejs.cn/api/fs.html#file-system-flags)， Integer， **默认值为r**

*mode：* **当文件不存在**，创建文件的模式， String | Integre， **默认值为0o666（可读可写）**

**return**

返回一个 promise ，用 [FileHandle](http://nodejs.cn/api/fs.html#class-filehandle) 履行 

如下代码，虽然 `w` 标志可以在 *example.jpeg* 不存在时新建，但在 *img* 路径不存在时并不会新建此目录，而是直接抛出错误。

```js
async function openFile () {
  const fileHandle = await fs.open('./img/example.jpeg', 'w')
}

openFile().catch(err => console.log(err)) 
```

`mode` 设置的是新建的文件，进行操作之后保存时的模式。如下代码 `flag` 为 'w'， 文件 *write.txt* 不存在会进行新建，写入后保存的模式是 ‘0555’  任何用户都是没有写权限的。当第二次运行这段代码时，以 `w` 打开就会报错。 

```js
async function openFile () {
  const fileHandle = await fs.open('./dir/write.txt', 'w', 0555)
  const buffer = Buffer.from('乕hello world')
  await fileHandle.write(buffer)
}

openFile().catch(err => console.log(err))
```



## fileHandle.write

写入文件 

### fileHandle.write(buffer[, offset, length, position])

**arguments**

*buffer：* Buffer | TypedArray | DataView | string | Object

*offset：* 写入到文件的 buffer 的偏移量。 integer， **默认值为0**

*length：* 写入到文件的 buffer 的长度（这里的长度是 byteLength 不是 length）

*position：* 从文件的那个位置写入 buffer，**默认值为当前位置**

**return**

解决的 promise, 用有 bytesWritten 和 buffer 属性的对象履行

*bytesWritten：* 写入的字节数，Interge

*buffer：* 写入的 buffer

- **写入一个DateView**

```js
// fs.js
async function writeFile() {
  let data = new ArrayBuffer(6)
  let view = new DataView(data)
  // 228 185 148 乔
  // 228 185 149 乕
  view.setInt8(0, 228)
  view.setInt8(1, 185)
  view.setInt8(2, 148)
  view.setInt8(3, 228)
  view.setInt8(4, 185)
  view.setInt8(5, 149)
  const fileHandle = await fs.open('dir/write.txt', 'w+')
  await fileHandle.write(view)
  // await fileHandle.write(view, 0, 3) ->  乔
}
writeFile().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// dir/write.txt
// 乔乕
```

:::tip
在 `w` 模式下， 第三个参数 `position` 一般不会在写入的时候用到，因为 `w` 模式是截断清空文件内容之后才写入的。想要修改文件， 用 `r+` 模式。 
:::

```js
async function writeFile() {
  let data = new ArrayBuffer(6)
  let view = new DataView(data)
  // 228 185 148 乔
  // 228 185 149 乕
  view.setInt8(0, 228)
  view.setInt8(1, 185)
  view.setInt8(2, 148)
  view.setInt8(3, 228)
  view.setInt8(4, 185)
  view.setInt8(5, 149)
  const fileHandle = await fs.open('dir/write.txt', 'r+')
  return fileHandle.write(view, 3, 3, 6)
}

// dir/write.txt
// 乔乕乕
```
:::tip
写入 string 时 还是用下面的入参方式吧:dog:
写入 Object 还是省点心吧:dog:
:::

### filehandle.write(string[, position[, encoding]])

**arguments**

*string：* string | object

*position：* 写入到文件的 buffer 的偏移量。 integer， **默认值为0**

*encoding：* 字符串的编码形式

**return**

返回一个promise，用一个有 bytesRead 和 buffer 属性的对象解决

*bytesWritten：* 写入的字节数，Interge

*buffer：* 写入的 buffer

:::tip
写入 object 时, 这个对象要有非继承的 `toString` 方法， 而 **不是** valueOf 方法，燃并暖，还是不能写入 Object。:dog:
:::

-  **写入string**

```js
async function writeFile() {
  const fileHandle = await fs.open('dir/write.txt', 'w+')
  return fileHandle.write('hello word', 0, 'utf8')
}
writeFile().then(res => {
  console.log(res) // { bytesWritten: 10, buffer: 'hello word' }
}).catch(err => {
  console.log(err)
})
```


## filehandle.writeFile(data, options)

写入文件

**arguments**

*data：* string | Buffer | TypedArray | DataView | Object | AsyncIterable | Iterable | Stream

*options：* Object | String，Object 时可为 null 或有 encode 属性；String 时为 encode。
  
  - *encode：* 如果是字符串时，字符的编码， **默认值为utf8**
  
:::tip
然而还是不支持 Object 的写入
:::

- **写入一个数组**

```js
async function writeFile() {
  const fileHandle = await fs.open('dir/write.txt', 'w+')
  return fileHandle.writeFile(['a', 'a', 'a', 'a'])
}
writeFile().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// dir/write.txt
// aaaa
```



## filehandle.read

读取文件

### filehandle.read(buffer, offset, length, position)

**arguments**

*buffer：* 读取文件的内容，填充的 buffer

*offset：* buffer 开始填充的位置。 integer， **默认值为0**

*length：* 读取的字节数（这里的长度是 byteLength 不是 length）

*position：* 从文件的那个位置开始读取，**默认值为当前位置**

**return**

返回一个promise，用一个有 bytesRead 和 buffer 属性的对象解决

*bytesRead：* 读取的字节数

*buffer：* 入参 buffer 的引用

```js
async function readFile() {
  const buffer = Buffer.alloc(10)
  const fileHandle = await fs.open('dir/readFile.txt', 'r+')
  return fileHandle.read(buffer, 1, 5, 2)
}

readFile().then(res => {
  console.log(res) // { bytesRead: 5, buffer: <Buffer 00 6c 6c 6f 20 77 00 00 00 00> }
}).catch(err => {
  console.log(err)
})
```



### filehandle.read([options])

**arguments**

可选参数 options 是一个对象， 属性和上面的入参一致，接收 buffer、 position、 offset、 length。 这些属性也都是可选的

**return**

返回一个promise，用一个有 bytesRead 和 buffer 属性的对象解决



## filehandle.readFile(options)

**arguments**

*options：* Object | null
  
  - *encoding：* string | null

  - *sigal：* [AbortSignal](http://nodejs.cn/api/globals.html#class-abortsignal) 允许中止正在进行的读取文件

**return**

返回 promise， 用读取的内容解决， 如果 读取的入参 `encoding` 指定，内容为 string， 否则为 buffer

- **不指定 encoding**

```js
async function readFile() {
  const fileHandle = await fs.open('dir/readFile.txt', 'r+')
  return fileHandle.readFile()
}
readFile().then(res => {
  console.log(res) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 64>
}).catch(err => {
  console.log(err)
})
```

- **指定 encoding**

```js
async function readFile() {
  const fileHandle = await fs.open('dir/readFile.txt', 'r+')
  return fileHandle.readFile({encoding: 'hex'})
}
readFile().then(res => {
  console.log(res) // 68656c6c6f20776f7264
}).catch(err => {
  console.log(err)
})
```

:::tip
这样读区的，文件内容要一次性写入到内存， 所以建议使用 createReadStream api
:::


## 其他 api， 请参见[官方文档](http://nodejs.cn/api/fs.html#fspromisesaccesspath-mode)



### fileHandle.stat([options])



### fileHandle.utimes(atime, mtime)



### fs.access(path[, mode])

:::tip
不要和 fs.open 一起使用
:::



### fs.stat(path[, options])



### fs.readFile(path[, options])



### fs.appendFile(path, data[, options])



### fs.writeFile(file, data[, options])



### fs.watch(filename[, options])



### fs.mkdir(path[, options])



### fs.rmdir(path[, options])



### fs.rm(path[, options])



### fs.copyFile(src, dest[, mode])



### fs.rename(oldPath, newPath)



### fs.chmod(path, mode)



### fs.chown(path, uid, gid)


