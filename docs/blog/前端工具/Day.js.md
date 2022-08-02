---
title: Day.js
date: 2022-8-2
---

[Day.js中文官网]( https://www.lodashjs.com/)

npm安装
```js
 npm install dayjs --save
 ```
项目使用
```js
  var dayjs = require('dayjs')
  //import dayjs from 'dayjs' // ES 2015
  dayjs().format()
```

常用日期格式化
```js
  dayjs().format();                                     // 2020-09-08T13:42:32+08:00
  dayjs().format('YYYY-MM-DD');                         // 2020-09-08
  dayjs().format('YYYY-MM-DD HH:mm:ss');                // 2020-09-08 13:47:12
  dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss');   // 2011-10-17 00:17:56
```