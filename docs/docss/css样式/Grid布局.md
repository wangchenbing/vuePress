---
title: Grid布局
date: 2022-7-18
tags:
 - CSS
---

grid布局

```css
/* 在父级盒子开启flex布局 */
  display:grid;
```

##  间距

```css
  /* 行间距 */
  row-gap: 30px;
  /* 列间距 */
  column-gap: 30px;
  /* 行列缩写*/
  grid-gap: 30px;
```

##  行列

```css
  /*列数 repeat自动重复多少列每列宽度 */
  grid-template-columns: repeat(4, 80px); 
  /* 按照比例等分,每行个数 */
  grid-template-columns: repeat(4, 1fr);
  /* 设置某一列最小宽度 */
  grid-template-columns: 1fr minmax(400px, 1fr); 
  /* 设置某一列自适应 */
  grid-template-columns: 100px auto 100px;  
  /* 行数 参数同上 */
  grid-template-rows: repeat(4, 80px);
```

##  主轴分布

```css
  justify-content: space-around;
  /* 在一行中平均分配 */
  justify-content: space-between;
  /* 在一行中对顶分配 */
  justify-content: space-evenly;
  /* 所有格子间隔一样 */
  justify-content: center;//子元素居中对齐
  justify-content: flex-end;//从尾部开始排列
  justify-content: flex-start;//默认值,从头开始
```

##  侧轴分布,

```css
/* 同上 */
align-items: center;
```