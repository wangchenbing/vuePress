---
title: Arguments对象
date: 2022-7-19

---

arguments 是一个对应于传递给函数的参数的类数组对象。

```jsx
function func() {
  console.log(arguments[0]);//1
  console.log(arguments[1]);//2
  console.log(arguments[2]);//3
}

func(1, 2, 3);
```

> arguments对象是所有（非箭头）函数中都可用的**局部变量**。
> 
> 你可以使用arguments对象在函数中引用函数的参数。
> 
> 此对象包含传递给函数的每个参数，第一个参数在索引0处。

```jsx
arguments[0]
arguments[1]
arguments[2]
```

参数也可以被设置

```jsx
arguments[1] = 'new value';
```

arguments对象不是一个Array。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。例如，它没有 pop方法。但是它可以被转换为一个真正的Array：

```jsx
	const a = Array.prototype.slice.call(arguments)
  const b = [].slice.call(arguments)
  const c= Array.from(arguments)
  const d = [...arguments]
```