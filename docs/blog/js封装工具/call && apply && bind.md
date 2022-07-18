---
title: call && apply && bind
date: 2022-7-18
tags:
 - JS
categories:
 - 前端小笔记
---

# Call
```js
Function.prototype.call = (context = window) => {
  context.fn = this
  const args = [...arguments].slice(1)
  const res = context.fn(...args)
  delete context.fn
  return res
}

```

# Apply

```js
Function.prototype.apply = (context = window, args) => {
  context.fn = this;
  let res;

  if (args.length) {
    res = context.fn(args);
  } else {
    res = context.fn();
  }

  delete context.fn;
  return res;
};

```
# bind
```js
Function.prototype.bind = context => {
  const self = this;
  const args = [].slice.call(arguments, 1);

  function resFn() {
    return self.apply(
      this instanceof resFn ? this : context,
      args.concat(...arguments)
    );
  }

  function middleFn() {}

  middleFn.prototype = self.prototype;
  resFn.prototype = new middleFn();

  return resFn();
};

```
