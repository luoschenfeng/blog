function * a () {
  yield [1];
  yield [2];
}


function * b () {
  [...(yield * a())]
  yield 4
}

const c = b()

// c.next()
// c.next()

// const d = b(true)

// d.next()
// d.next()
// d.next()
// d.next()


// function* a() {
//   console.log(1)
// }

// function* b() {
//   yield* a();
//   yield 1;
// }

// const c = b()

console.log(c.next()) // { value: 1, done: false }
console.log(c.next()) // { value: 1, done: false }
console.log(c.next()) // { value: 1, done: false }

// 1


