---
title: Number处理
date: 2022-7-18
tags:
 - JS
categories: 
 - 前端封装工具
---

## 数字千分位分割
```js
function commafy(num) {
  return (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
```

  ## 万转换亿
```js
const abs = (val) => {
  var str = (val / 10000).toFixed(4) + '';
  var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
  var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
  var ret = intSum + dot;
  return ret;
}
```

## 生成随机数
```js
function randomNum(min, max) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * min + 1, 10)
    case 2:
      return parseInt(Math.random() * (max - min + 1) + min, 10)
    default:
      return 0
  }
}
```
