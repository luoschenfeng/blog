# stream

`Writabe` 是上层将数据写入到数据缓存区供底层消费， `Readable` 是底层将数据写入数据缓存区供上层消费。

## Writable

### drain 事件

在调用 stream.write() 写入的字符大于等于 highWaterMark 会返回 false 并触发 drain 事件。调用 stream.end() 会执行 stream._write() 但不会触发 drain 事件。

:::tip
当调用 stream.write() 返回 false 时， 数据默认情况下还会被写入，除非进行特殊处理
:::

```js {24}
const { Writable } = require('stream')
const fs = require('fs')
class WriteStream extends Writable {
  constructor(filename, callback) {
    super({
      decodeStrings: false,
      highWaterMark: 2,
    })
    this.filename = filename
    this.on('finish', function () {
      if (this.fd) {
        // 当写入为 ‘yz’ 时关闭文件
        fs.closeSync(this.fd)
      }
    })
  }
  _construct(callback) {
    fs.open(this.filename, 'r+', (err, fd) => {
      if (err === null) callback(err)
      this.fd = fd
    })
  }
  _write(chunk, encoding, callback) {
    // console.log(this.writableLength)
    let { size } = fs.statSync(this.filename)
    fs.writeSync(this.fd, chunk, size, encoding)
    // 调用 callback，表明这次写入结束，要不然会阻塞接下来的写入
    callback(null)
  }
}

let chars = Array.from({length: 26}, (_, value) => String.fromCharCode(97 + value)).join('')
const writeStream = new WriteStream('./dir/write.txt', (err) => {console.log(err)})
let position = 0
let size = 2

writeStream.on('drain', function () {
  console.log(position)
  writeChars()
})

function writeChars() {
  let char =  chars.slice(position, position += size)
  if (char.includes('z')) {
    // 结束写入
    writeStream.end(char)
  } else if(writeStream.write(char)) {
    writeChars()
  }
}

writeChars()

// 输出
// 2
// 4
// 6
// 8
// 10
// 12
// 14
// 16
// 18
// 20
// 22
// 24
```
上面代码向文件写入字母表，每次写入的 size 和 流的 highWaterMark 相同，所以每次写入都会触发 drain 事件。

:::tip
当将 写入的 size 改为 1 时，就只会触发一次 drain 事件。
**为什么会触发一次？**
因为观察第 24 行可以发现 writableLength 为 2,在 callback 中写入数据就不会触发 drain 事件了
:::

### 向流中写入数据

-  stream.write(chunk[, encoding, callback])

配置项 decodeStrings 默认为 true， encoding 会被转换为 buffer，要想以字符串其他编码形式写入，要将其置为 false 

- stream.end(chunk[, encoding, callback])


## Readable


Readable 流以两种模式之一有效地运行：流动和暂停。

- 在流动模式下，数据会自动从底层系统读取，并通过 EventEmitter 接口使用事件尽快提供给应用程序。

- 在暂停模式下，必须显式调用 stream.read() 方法以从流中读取数据块。

### 切换模式

**流动状态下切换到暂停模式**

- 如果没有管道目标，则通过调用 stream.pause() 方法。
  
- 如果有管道目标，则删除所有管道目标。 可以通过调用 stream.unpipe() 方法删除多个管道目标。

**暂停模式下切换到流动模式**

- 如果没有管道目标，则通过调用 stream.resume() 方法（要事先添加 data 消费句柄，否则原先暂停模式下缓存的数据将被丢失）（暂停状态，readableFlowing = false，直接添加 data 句柄不会切换，在 readable.readableFlowing = null，，创建流时直接添加 data 事件句柄会切换）。
  
- 如果有管道目标，stream.pipe()。

:::tip
切换到流动模式，没有定义消费者，或者消费方式被禁用（如readable 缓存数据量超过了 highwatermark，产生背压）是不会产生数据的。
比如通过调用 stream.resume() 方法切换到流动模式，没有添加 data 句柄不会产生数据。
:::

:::tip
新建可读流，没有定义消费者也不会产生数据的。
比如没有添加 data 及 readable 事件
:::

**不正确的切换到暂停流的方式**
  
- 没有管道目标，通过删除 data 句柄，流不会暂停，反而会导致以前产生的数据丢失，那以后产生的数据呢?删除 data 句柄之后，没有切换到暂停模式，不会再产生数据了。
  
- 如果有管道目标，则调用 stream.pause() 将不能保证一旦这些目标排空并要求更多数据，流将保持暂停状态。


### data 事件

**什么时候会触发 data 事件？**

- 暂停模式下手动调用 readable.read()，并且可以返回数据块时

- 流动模式消费数据会自动调用 readable.read()，并触发 data 事件（流从暂停模式切换到流动模式，如果没有数据可以消费，不会调用 data 事件）

```js
const { Readable } = require('stream')
const fs = require('fs')

let writeStream = fs.createWriteStream('./dir/write.txt')

let readStream = new Readable({
  read() {}
})

readStream.on('data', function (data) {
  console.log(data)
})
readStream.pause()

// readStream.resume()
// readStream.pipe(writeStream)
// readStream.push('abc')
// 上面这两行流会处于暂停状态，最后两行的任意一行都会使流切换到流动状态，并且有数据被消费时，触发 data 事件
```


### readable 事件

**readable 会使流暂停**

当有可从流中读取的数据或已到达流的末尾时，则将触发 'readable' 事件。 实际上，'readable' 事件表明流有新的信息。 如果数据可用，则 stream.read() 将返回该数据。
如果已经到达流的末尾，则调用 stream.read() 将返回 null 并触发 'end' 事件。 如果从未读取到任何数据，则也是如此。

:::tip
创建流添加 data 事件，为流动模式，添加 readable 时暂停模式，并且 readable 优先级较高
:::

:::tip
怎样理解 data 和 readable 事件

每当流将数据块的所有权移交给消费者时，也就是被消费时，就会触发 data 事件。无论是流动状态下的自动调用 read 方法，或暂停状态下手动调用 read 方法触发一次。

readable 一般用于暂停模式下读取数据
:::

```js
const { Readable } = require('stream')

const readable = new Readable({
  read() {}
})
readable.on('data', function (data) {
  console.log('data -> ', data)
})
readable.on('readable', function () {
  let data = readable.read()
  console.log('readable -> ', data)
})
console.log(readable.readableFlowing)
readable.on('end', function () {
  console.log('end', )
})

readable.push('123')
setTimeout(() => {
  readable.push('456')
  readable.push(null)
}, 0);
readable.push('789')
// 输出
// false
// data ->  <Buffer 31 32 33 37 38 39>
// readable ->  <Buffer 31 32 33 37 38 39>
// data ->  <Buffer 34 35 36>
// readable ->  <Buffer 34 35 36>
// readable ->  null
// end
```
可以看出定义了 readable 后，readableFlowing 为 false。

当调用 read 方法时，也会触发 data 事件，在读取到 null 时，会触发 end 事件，不会再触发 data 事件。

### stream._read(), stream.push()

```js
const { Readable } = require('stream')
const { Buffer } = require('buffer')
const fs = require('fs')
class ReadStream extends Readable {
  constructor(filename, option) {
    super(option)
    this.filename = filename
    this.position = 0
    this.size = 2
  }
  _construct(callback) {
    this.fd = fs.openSync(this.filename, 'r')
    this.fileSize = fs.statSync(this.filename).size
    callback()
  }
  _read() {
    // console.log(this.readableLength)
    let buffer = Buffer.alloc(this.size)
    if (this.position >= this.fileSize) {
      fs.closeSync(this.fd)
      this.push(null)
    } else {
      fs.readSync(this.fd, buffer,{ offset: 0, length: this.size, position: this.position})
      this.position += this.size
      this.push(buffer)
    }
  }
}


let readStream = new ReadStream('./dir/write.txt', () => {})

readStream.on('data', function (chunk) {
  console.log(chunk)
})
readStream.on('close', function () {
  console.log('close')
})
```

当添加 data 事件句柄后，会立刻调用 _read()（暂停模式下要手动调用 _read()）, 当底层有数据可用时，在  _read() 中要调用 stream.push() 将底层数据添加到读取队列，每次 push 后都会再次调用 _read()（读取以前push 的数据，并且调用 push 添加新数据），直到 push(null)，表示底层数据已经被读取完成。然后会触发 close 事件。在这期间如果 _read() 有读取到数据（以前添加到读取队列中的，无论是暂停或者流动模式下），就会触发 data 事件。

也可以试一下将 data 事件换成 readable 事件。看一下执行结果

```js
readStream.on('readable', function () {
  console.log(readStream.read())
})
```
