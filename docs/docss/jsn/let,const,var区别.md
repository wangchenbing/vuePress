---
title: let,const,var区别
date: 2022-7-18
---


## 不存在变量提升

**var**命令会发生“变量提升”现象，即变量可以在声明之前使用，值为**undefined.**

为了纠正这种现象，**let**命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```jsx
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

  上面代码中，变量**foo**用**var**命令声明，会发生变量提升，即脚本开始运行时，变量**foo**已经存在了，但是没有值，所以会输出**undefined**。变量**bar**用**let**命令声明，不会发生变量提升。这表示在声明它之前，变量**bar**是不存在的，这时如果用到它，就会抛出一个错误。

## 暂时性死区

  ES6 明确规定，如果区块中存在**let**和**const**命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

  总之，在代码块内，使用**let**命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```jsx
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

## 不允许重复声明

let
不允许在相同作用域内，重复声明同一个变量。

```jsx
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

**function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错**
```

## 块级作用域

```jsx
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```