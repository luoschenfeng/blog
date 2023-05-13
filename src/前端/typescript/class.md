# class

## 属性

申明公共可读写属性

```ts
class Point {
  x: number
  y: number
}
```

`strictPropertyInitialization` 设置为 `true`，使得属性必须由 `constructor` 初始化

```ts 
class Point {
  x: number
  y: number
  constructor (x: number, y: number ) {
      this.x = x
      this.y = y
  }
}
```

`readonly` 属性, 表示此属性在实例化之后不能被修改

```ts{7}
class Point {
  readonly x: number
  constructor(x: number) {
    this.x = x
  }
  setX() {
    this.x = 1 
    /**
     * Error
     * Cannot assign to 'x' because it is a read-only property
    */
  } 
}
```

## constructor 重载

```ts
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```
## implements

可以用 `implements` 检查 一个类是否实现了  `interface`, implements 只是做成员
```ts
interface IAnimal {
  weight: string
}
class Animal implements IAnimal {
  type: string
  constructor(type: string) {
    this.type = type
  }
}
/**
 * Error
 * Class 'Animal' incorrectly implements interface 'IAnimal'.
*/
``` 

implements 需要类与 interface 的成员及类型一致，但不影响类方法原有的行为    

```ts
interface Checkable {
  check(name: string): boolean;
}
 
class NameChecker implements Checkable {

  check(s) {
    return s.toLowercse() === 'ok';
  }

  /**
   * Error
   * Parameter 's' implicitly has an 'any' type
   */
}
```

上面的例子，typescript 并不会将 check 的参数 s 推断成 string

## 继承

### extends

派生类继承基类

```ts
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
```
### super

在派生类构造函数中调用`super` 才可以访问this，typescript只是为类的方法增加了类型注解，在类中同样也支持 `set` 和 `get` 方法。

```ts
class Animal {
  type: string
  constructor(type: string) {
    this.type = type
  }
}
class Bird extends Animal {
  flyHeight: number
  size: number
  constructor(flyHeight: number, size = 1) {
    super('bird')
    this.flyHeight = flyHeight
    this.size = size
  }
  get sizeDescription() {
    return this.size
  }
}
```

### 方法重写

overriding 方法时要兼容基类的类型约束

###