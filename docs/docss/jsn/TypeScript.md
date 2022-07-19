---
title: TypeScript
date: 2022-7-19
---

## 类型注解

```jsx
const a: string = 'foobar';

const b: number = 1;

const c: boolean = true;

// 严格模式下不允许为空 strictNullChecks 只用来检查类型
const d: string = '234';

// 严格模式下void只能为undefind, 非严格模式可以为null
const e: void = undefined;

const f: null = null;

const g: undefined = undefined;

// 任何es6新增对象，只能在es2015中使用，所以es5中不能使用
// 如果设置了lib，需要引入DOM库，不然console等内置对象会报错
const h: symbol = Symbol();

// yarn tsc --locale zh-CN  中文错误消息提示
// vscode自己提示使用typescript-locale设置zh-CN即可
const error: string = '100';
```

## 数组

```jsx
// 数组类型
const arr1: Array<number> = [1,2];

const arr2: string[] = ['a', 'b']

// 数组类型应用
function sum(...args: number[]) {
    // 判断成员是不是数字
    return args.reduce((prev, current) => {
        return prev + current;
    }, 0)
}

sum(1,32);
```

## Object

```jsx
const foo: object = () => {}; // [] {} () => {} object类型

const obj: {foo: number} = {foo:1}; // 必须跟声明的一致，否则不行
```

元祖类型

```jsx
// hook中都应用到
const tuple: [number, string] = [1,'a'];

const age = tuple[0];

const name = tuple[1];

const [myAge, myName] = tuple;
```

## 枚举

```jsx
// const postStatus = {
//     Draft: 0,
//     onPublished: 1,
//     published: 2
// }

// 枚举类型
// 如果不指定值，则从0开始累加
// enum PostStatus {
//     Draft = 0,
//     onPublished = 1,
//     Published = 2,
// }

// 字符串枚举
// 如果加了const，则会使用真实值
const enum PostStatus {
    Draft = 'aaa',
    onPublished = 'bbb',
    Published = 'ccc',
}

const post = {
    title: 'hello ts',
    content: 'ts 666',
    status: PostStatus.Draft, // 0, 1, 2
}

// console.log(PostStatus[0]);

// 枚举会影响编译后的结果
enum Status {
    Draft = 0,
    onPublished = 1,
    Published = 2,
}

const post1  ={
    status: Status.onPublished
}

console.log(post1.status);
```

## 函数类型

```jsx
// 加了问号标识可选参数，或者添加默认值
// 可选参数必须出现在最后面
function fn(a: number, b: number = 10, ...rest: number[]): string {
  return "1";
}

// 参数个数必须要相同，形参和实参个数相同
fn(100, 100);

// 函数类型标识
const fun2: (a: number, b: number) => string = function (a: number, b: number) {
  return "fn";
};
```

## 泛型

<aside>
📌 可以通过T指定调用的时候再确定类型

</aside>

```jsx
function identity<T>(arg: T): T {
    return arg;
}

identity<boolean>(true);

window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);
}
```

## any

<aside>
📌 any不会做任何类型检查，语法不会报错

</aside>

```jsx

function stringify(value: any) {
    return JSON.stringify(value);
}

stringify('a');
stringify(1)
```

类型断言

自己指定执行的结果类型

```jsx
// 类型断言
// 自己制定类型

const nums = [110,22,6,7];

const res = nums.find(i => i > 0);

// const square1 = res * res; res推断为number或者undefined

const num1 = res as number;
const num2 = <number>res; // jsx会跟<>冲突 推荐as语法
const square = num1 * num1;
```

## interface接口

```jsx
// 接口约束对象的结构
interface Post {
    title: string
    content: string
}

function printPost(post: Post) {
    console.log(post.title);
    console.log(post.content);
}

printPost({
    title: '1',
    content: '',
})
```

## 接口可选成员&只读成员

<aside>
📌 ？可选成员

</aside>

<aside>
📌 readonly 只读成员

</aside>

```jsx
// 接口约束对象的结构
interface Post {
    title: string
    content: string
    subTitle?: string // 可选成员，undefined或者string
    readonly summary: string // 只读成员
}

const hello: Post = {
    title: 'hello, ts',
    content: 'javascript superset',
    summary: '简介'
}

// hello.summary = '234';
// string类型的键值
interface Cache {
    [prop: string]: string, // prop为自己定义，只是为了声明格式
}

const cache: Cache = {

}

cache.foo = 'value';
```

## 类

```jsx
class Person {
  // 声明类型
  name: string; // = 'init name'
  age: number; // = 'init number'
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    // this.gender = 0; 必须要声明再赋值
  }

  sayHi(msg: string): void {
    console.log(`i am ${this.name}, ${this.age}`);
  }
}

const p = new Person("a", 1);
console.log(p);
```

类-访问修饰符

```jsx
class Person {
  // 声明类型
  public name: string; // 默认公有属性 建议添加
  private age: number; // 私有属性，只能在当前类进行访问
  protected gender: boolean; // 受保护的类型,可以在继承的子类中进行访问
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.gender = true;
    // this.gender = 0; 必须要声明再赋值
  }

  sayHi(msg: string): void {
    console.log(`i am ${this.name}, ${this.age}`);
  }
}

const tom = new Person("tom", 18);

class Student extends Person {
  // 如果构造函数是私有的，则只能内部进行new，然后通过静态方法返回回去
  private constructor(name: string, age: number) {
    super(name, age);
    console.log(this.gender);
    // console.log(this.age);
  }

  static of(name: string, age: number) {
    return new Student(name, age);
  }
}

// console.log(tom.gender);

const student = Student.of("tom", 18);
```

## 类-只读属性

```jsx
class Person {
  // 声明类型
  public name: string; // 默认公有属性 建议添加
  private age: number; // 私有属性，只能在当前类进行访问
  readonly gender: boolean; // 只读属性
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.gender = true;
    // this.gender = 0; 必须要声明再赋值
  }

  sayHi(msg: string): void {
    console.log(`i am ${this.name}, ${this.age}`);
  }
}

const tom = new Person("tom", 19);
```

## 类与接口

```jsx
// interface EatAndRun {
//   eat(food: string): void;
//   run(distance: number): void;
// }
interface Eat {
  eat(foo: string): void;
}

interface Run {
  run(distance: number): void;
}

// 通过接口对类进行限制

class Person implements Eat, Run {
  constructor() {}
  eat(food: string): void {
    console.log(`优雅的进餐${food}`);
  }

  run(distance: number) {
    console.log(`直立行走${distance}`);
  }
}

class Animal implements Eat, Run {
  eat(food: string): void {
    console.log(`呼噜呼噜的吃${food}`);
  }

  run(distance: number) {
    console.log(`爬行：${distance}`);
  }
}
```

## 抽象类

```jsx
// abstract定义抽象类
abstract class Animal {
  eat(food: string): void {
    console.log(`吃${food}`);
  }

  //   父类定义了，子类必须去实现
  abstract run(distance: number): void;
}

class Dog extends Animal {
  run(distance: number): void {
    console.log(`四条腿行走${distance}`);
  }
}

const d = new Dog();
d.eat("好吃的");

d.run(100);
```

## 泛型

```jsx
// 声明时候不声明，调用时候传递一个类型，为了复用代码

function createNumberArray(length: number, value: number): number[] {
  const arr = Array<number>(length).fill(value);
  return arr;
}

function createStringArray(length: number, value: string): string[] {
  const arr = Array<string>(length).fill(value);
  return arr;
}

const res = createNumberArray(4, 100);
console.log(res);

// 泛型
// 调用函数的时候再指定类型
function createArray<T>(length: number, value: T) {
  const arr = Array<T>(length).fill(value);
  return arr;
}

const res1 = createArray<string>(3, "name");
const res4 = createArray<number>(3, 4);
console.log(res1);
```

## 类型声明

```jsx
import { camelCase } from "lodash";
import { parse } from "query-string";
// query-string内置了声明文件

parse("324");

// 成员定义的时候没有确定类型，我们可以在使用的时候再给他声明类型
// 兼容js模块来设计的

// declare function camelCase(input: string): string;

// 可以安装@types/lodash类型说明文件，就可以不用自己声明了

const res = camelCase("hello typed");
```

## 7隐式类型推断

```jsx
let age = 18;

// age = 'string' // 不能赋值，因为推断你的类型为number

let foo;

foo = 'string'
```

## tsconfig.json文件说明

```jsx
"target": "es2015", // 转化js版本
"lib": ["ES2015", "DOM"], // 指定类型库
"outDir": "dist", // 输出结果的目录
"rootDir": "src", // 需要编译目录
```