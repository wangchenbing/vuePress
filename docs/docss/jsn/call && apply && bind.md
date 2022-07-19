---
title: call && apply && bind
date: 2022-7-18
tags:
 - JS
categories:
 - 前端小笔记
---

# Call
> call的使用，可以改变this指向，第一个参数为宿主对象，也就是要改变的this指向，后面的参数全部为当前函数的实参

应用场景:  经常做继承.
```js
const fn = function(sex,like) {
    this.sex = sex
    this.like = like
    console.log(this)
  }  
  var obj = {
    name: '张三',
    age: 19
  }
  fn.call(obj,'男','打篮球')

```

# Apply

> apply：可以改变this指向，第一个参数为宿主对象，第二个参数为数组，数组每一项为当前函数的所有实参

应用场景:  经常跟数组有关系

```js
const fn = function(sex,like) {
    this.sex = sex
    this.like = like
    console.log(this)
  }  
  var obj = {
    name: '张三',
    age: 19
  }
  fn.apply(obj,['男','打篮球'])

```
# bind
>可以改变this指向，bind会基于原函数创建一个新的函数，并改变其his指向，指向bind的第一个参数，一旦通过bind改变this指向之后，
  后续不管通过什么方式调用，this都不会在改变了
>
>如果只是想改变 this 指向，并且不想调用这个函数的时候，可以使用bind

应用场景:不调用函数,但是还想改变this指向
```js
const fn = function(sex,like) {
    this.sex = sex
    this.like = like
    console.log(this)
  }  
  var obj = {
    name: '张三',
    age: 19
  }
  var fn1 = fn.bind(obj,'男','打篮球')
  fn1()

```
## 三者的异同:

> 共同点:都可以改变this的指向
> 
> 不同点:
> 
> 1.call和apply会调用函数,并且改变函数内部this的指向
> 
> 2.call 和 apply传递的参数不一样,call传递参数使用逗号隔开,apply使用数组传递
> 
> 3.bind  不会调用函数, 可以改变函数内部this指向.
