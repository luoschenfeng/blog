# error 

以前理解错的一个问题， Promise 的错误处理,记录一下。

```js
function bar () {
  return new Promise((resolve, reject) => {
    throw new Error('trouble')
  })
}

function baz() {
  return new Promise((resolve, reject) => {
    bar().catch(err => {
      reject(err)
    })
  })
}

baz().catch(err => {
  throw err
})
```


## Error.captureStackTrace(targetObject[, constructorOpt])

第一个参数 使得调用 `new Error().stack` 时的第一行展示 ${targetObject.name}: ${targetObject.message}；堆栈信息的第一行为调用此方法的行数

第二个参数接受一个函数。 如果给定，则所有 constructorOpt 以上的帧，包括 constructorOpt，都将从生成的堆栈跟踪中省略。对于向用户隐藏错误生成的实现细节很有用。


```js
function MyError (msg) {
  const error = new Error(msg)
  Error.captureStackTrace(error, MyError)
  error.name = new.target.name
  return error
}

throw new MyError('abc')

/**
* Error [MyError]: abc
*     at Object.<anonymous> (/path/code/node/error.js:8:7)
*/
```

```js
function MyError (msg) {
  const error = new Error(msg)
  Error.captureStackTrace(error)
  error.name = new.target.name
  return error
}

throw new MyError('abc')

/**
* Error [MyError]: abc
*     at new MyError (/path/code/node/error.js:3:9)
*     at Object.<anonymous> (/path/code/node/error.js:8:7)
*/
```
