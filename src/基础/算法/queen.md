## 8 皇后问题的代码实现

```js
function add (point) {
  return point[0] + point[1]
}
function del (point) {
  return point[0] - point[1]
}
function identical(point1, point2) {
  return (point1[0] === point2[0]) || (point1[1] === point2[1]) || (add(point1) === add(point2)) || (del(point1) === del(point2))
}
function notRepeat (path, point) {
  if (!path.length) return true
  for (let selseted of path) {
    if (identical(selseted , point)) {
      return false
    }
  }
  return true
}
function queen() {
  let result = []
  function select(path, selected, start) {
    if (path.length === 4) {
      result.push(path.slice())
      path = []
      return
    }
    for (let i = start; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (notRepeat(path, [i, j]))  {
          path.push([i, j])
          select(path, selected, path[path.length - 1][0])
          path.pop()
        }
      }
    }
  }
  let path = []
  select(path, 0, 0)
  return result
}

console.log(queen())

// 输出

// [
//   [ [ 0, 1 ], [ 1, 3 ], [ 2, 0 ], [ 3, 2 ] ],
//   [ [ 0, 2 ], [ 1, 0 ], [ 2, 3 ], [ 3, 1 ] ]
// ]
```


## 全排列

给定四个数字，及4个操作符（+ ， -， *， /），输出这4个数字在这些操作符（可重复，也可以不重复）从左到右计算，结果为24


```js
let numList = [9, 76, 7, 45]

let operates = {
  add(num1, num2) {
    return num1 + num2
  },
  sub(num1, num2) {
    return num1 - num2
  },
  mult(num1, num2) {
    return num1 * num2
  },
  divi(num1, num2) {
    return isNaN(num1 / num2) ? 0 : Math.floor(num1 / num2)
  },
}
let operateToSymbol = {
  add: '+',
  sub: '-',
  mult: '*',
  divi: '/',
}

function getOPerate(numList) {
  let selected = []
  let selectedOperate = []

  function toStr() {
    return selected.reduce((pre, cur, index)=> {
      return `${pre} ${numList[cur]} ) ${operateToSymbol[selectedOperate[index]] || ','} `
    }, '((((')
  }
  function getResult() {
    return selected.reduce((pre, cur, index) => {
        if (pre === null) {
          return numList[cur] 
        } else {
          return operates[selectedOperate[index - 1]](pre, numList[cur]) 
        }
    }, null)
  }
  function select(selected) {
    if (selected.length === 4) {
      if (getResult() === 24) {
        console.log(toStr())
      }
      return  
    }
    for (let i = 0; i < numList.length; i++) {
      if (selected.includes(i)) continue

      let num = numList[i]
      selected.push(i)
      if (selected.length === 1) {
        select(selected)
        selected.pop()
      } else {
        for (let operate of Object.keys(operates)) {
          // if(!selectedOperate.includes(operate)) {
            selectedOperate.push(operate)
            select(selected)
            selectedOperate.pop()
          // }
        }
        selected.pop()
      }
    }
  }

  select(selected)
}

getOPerate(numList)

// 输出
// (((( 76 ) -  45 ) *  7 ) /  9 ) ,
```
