# 滑动窗口

找子集最小索引

```js
const str = 'abcbcad'
const subStr = 'abcd'

function getIndex() {
  let l = 0;
  let r = -1
  let index = -1
  let temp = subStr 
  while (!temp.length || r < str.length) {
    r++
    let tempIndex = temp.indexOf(str[r])
    if (tempIndex > -1) {
      temp = temp.slice(0, tempIndex) + temp.slice(tempIndex + 1)
    } else if (subStr.indexOf(str[r] > -1)) {
      while (l < r) {
        if (str[l] !== str[r]) {
          temp += str[l]
          l++
        } else {
          l++
          index = l
          break
        }
      }
    } else {
      temp = subStr
      break
    }
  }
  return index
}

console.log(getIndex())
```

找最小公约字符串

```js
let str = 'gsgsgrsfgrrgtrsgrhthhhfrdtgdsfesraswaaaaafasdfsfgsgsgrsfgrrgtrsgrhthhhfrdtgdsfesraswaaaaafasdfsf'

function getPrime(str) {
  let prime = ''
  let l = 0
  let r = 1
  while (l < str.length) {
    let sub = str.slice(l, r)
    if (sub === prime) {
      l = r
      r = r + prime.length
    } else {
      prime = str.slice(0, prime.length + 1)
      l = prime.length
      r = l + prime.length
    }
  }
  return (str.length / prime.length) + ‘ ’ + prime
}

console.log(getPrime(str))
// 输出

//2 gsgsgrsfgrrgtrsgrhthhhfrdtgdsfesraswaaaaafasdfsf
```
