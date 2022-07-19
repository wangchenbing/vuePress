---
title: promise使用
date: 2022-7-18
---


**Promise** 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。使得控制异步操作更加容易。可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。


传统的异步操作

```js
<script src="node_modules/jquery/dist/jquery.js"></script>
<script>
  $.ajax({
  url: 'http://liufusong.top:4000/books',
  success: function (res) {
    console.log(res)
  }
})
</script>
```

问题：请求成功之后的逻辑操作需要在回调中去完成，如果下一个异步依赖上一个异步，需要在上一个异步的回调中去处理下一次的异步，这样的代码会造成难以阅读和维护

```js
$.ajax({
  url: 'http://liufusong.top:4000/books',
  success: function (res) {
    console.log(res)
    const id = res[0]
    console.log(id)
    $.ajax({
      url: 'http://liufusong.top:4000/books/' + id,
      success: function (res2) {
        console.log(res2)
      }
    })
  }
})
```


## Promise使用介绍

Promise是一个构造函数

Promise构造函数原型上的方法，可以通过创建一个Promise实例进行调用

+ Promise.prototype.then()
+ Promise.prototype.catch()
+ Promise.prototype.finally()

Promise构造函数静态方法，直接通过Promise函数调用

+ Promise.all()
+ Promise.allSettled()
+ Promise.race()
+ Promise.reject()
+ Promise.resolve()

## 处理异步成功

利用Promise处理异步

```js
new Promise(function() {
  // 回调函数内部进行异步处理
  $.ajax({
    url: 'http://liufusong.top:4000/books',
    success: function (res) {
      console.log(res)
    }
  })
})
```

但是，现在还是需要再回调中使用数据，在回调外无法使用

通过回调函数的行参，处理成功和失败的结果

**异步成功结果处理**

```js
// 错误写法，硬是把法拉利开成了拖拉机
const promiseGetBooks = new Promise(function() {
  // 回调函数内部进行异步处理
  $.ajax({
    url: 'http://liufusong.top:4000/books',
    success: function (res) {
      $.ajax({
        
      })
    }
  })
})

// 正确写法
const promiseGetBooks = new Promise(function(resolve) {
  // 回调函数内部进行异步处理
  $.ajax({
    url: 'http://liufusong.top:4000/books',
    success: function (res) {
      resolve(res)
    }
  })
})

promiseGetBooks.then((res) => {
  console.log(res)
})
```

## 处理异步失败

```js
const promiseGetBooks = new Promise(function(resolve, reject) {
  // 回调函数内部进行异步处理
  $.ajax({
    url: 'http://liufusong.top:4000/book',
    error: function (err) {
      reject(err)
    }
  })
})

promiseGetBooks.catch((error) => {
  console.log(error)
})
```

## promise链式

```js
const promiseGetBooks = new Promise(function(resolve, reject) {
  // 回调函数内部进行异步处理
  $.ajax({
    url: 'http://liufusong.top:4000/books',
    success: function (res) {
      resolve(res)
    },
    error: function (err) {
      reject(err)
    }
  })
})

promiseGetBooks.then((res) => {
  console.log(res)
  return new Promise(function(resolve, reject) {
    // 回调函数内部进行异步处理
    $.ajax({
      url: 'http://liufusong.top:4000/books/1',
      success: function (res) {
        resolve(res)
      }
    })
  })
}).then(res=> {
  console.log(res)
  return new Promise(function(resolve, reject) {
    // 回调函数内部进行异步处理
    $.ajax({
      url: 'http://liufusong.top:4000/books/2',
      success: function (res) {
        resolve(res)
      }
    })
  })
}).then(res => {
  console.log(res)
})
```

## 封装promise

```js
const axios = (options) => {
  return new Promise(function(resolve, reject) {
    // 回调函数内部进行异步处理
    $.ajax({
      url: options.url,
      type: options.type || 'GET',
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}
```


## Promise示例
```jsx
const isPregnant = true;
const promise = new Promise((resolve, reject) => {
  if (isPregnant) {
    resolve('成功')
  } else {
    reject('失败')
  }
})
promise
  .then(res=> {
    console.log(res)
		const a = false
	  return new Promise((resolve, reject) => {
	    if (a) {
	      resolve('promise成功2')
	    } else {
	      reject('promise失败2')
	    }
	  }).then((w) => {
	    console.log(w)
	  }).catch((w)=> {
	    console.log(w)
	  })
  })
  .catch(name => {
    console.log(res)
  })
  .finally(() => {
    console.log('必须执行')
  })
```

利用promise处理异步解决回调地狱的问题

最终解决回调地狱的方法是async  await

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数

- **Promise对象有以下2个特点**

1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：**Pending(进行中)、Resolved(已完成)和Rejected(已失败)。**只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved；从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象进行回调函数，也会立即得到这个结果。

- **promise对象的状态只有两种可能**

pendding->rejected，pendding->resolved

**基础用法:**

new Promise((resolved,rejected)=>{})

**Promise对象**
```
  Promise对象resolved,rejected函数，在异步事件状态pendding->resolved回调成功时，会调用resolved函数；当异步操作失败时，回调用rejected函数。
```
## then()
```
  Promise的then(resolved,rejected)函数参数有两个，一个resolved函数，一个rejected函数。
```
## catch()
```
  Promise的catch()：捕捉promise错误函数，和then函数参数中rejected作用一样，处理错误，由于Promise抛出错误具有冒泡性质，能够不断传递，会传到catch中，所以建议所有错误处理放在catch中，then中只处理成功的。

  Promise一个大特色就是可以链式调用，在then，catch中可以返回Promise对象。
```
## all()
```
  Promise.all([promise1,promise2])：参数是promise对象数组，等到所有promise对象状态resolved，该对象的状态会resolved，会立即调用then,当有一个promise对象为rejected，该对象的状态就会变成rejectd，执行catch。

  Promise.all()获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。
```
## race()
```
  Promise.race([promise1,promise2])：竞速函数，当有一个promise对象状态变化了，该对象就会采用和相同的状态，并执行相应函数。

  promise的生命周期

  每个 Promise都会经历一个短暂的生命周期，初始为挂起态（ pending state），这表示异步操作尚未结束。一个挂起的 Promise 也被认为是未决的（ unsettled ）。一旦异步操作结束， Promise就会被认为是已决的（ settled ），并进入两种可能状态之一：

  1. 已完成（fulfilled ）： Promise 的异步操作已成功结束；

  2. 已拒绝（rejected ）： Promise 的异步操作未成功结束，可能是一个错误，或由其他原因导致。

一旦状态改变，就「凝固」了，会一直保持这个状态，不会再发生变化。当状态发生变化，promise.then绑定的函数就会被调用。注意：Promise一旦新建就会「立即执行」，无法取消。这也是它的缺点之一。
```
通过状态码判断是否成功

```jsx
   try {
    // 成功操作
    } catch (err) {
    // 失败操作
    }
```

## 手写promise
  ```js
    class Commitment{
      static PENDING = '待定'; static FULFILLED = '成功'; static REJECTED = '拒绝'
    
      constructor(func) {
        this.status = Commitment.PENDING
        this.result = null
        this.resolveCallback=[]
        this.rejectCallback=[]
        try {
          func(this.resolve.bind(this),this.reject.bind(this))
        } catch (error){
          this.reject(error)
        }
      }
      resolve(result) {
        setTimeout(()=> {
          if (this.status === Commitment.PENDING) {
            this.status = Commitment.FULFILLED
            this.result = result
            this.resolveCallback.forEach(callback => {
              callback(result)
            })
          }
        })
      }
      reject(result) {
        setTimeout(() => {
          if (this.status === Commitment.PENDING) {
            this.status= Commitment.REJECTED
            this.result = result
            this.rejectCallback.forEach(callback => {
              callback(result)
            })
          }
        })
      }
      then(onFulfilled, onRejected) {
        return new Commitment((resolve, reject) => {
          
          onFulfilled = typeof onFulfilled==='function' ? onFulfilled:()=>{}
          onRejected = typeof onRejected === 'function' ? onRejected : () => { }
          if (this.status === Commitment.PENDING) {
            this.resolveCallback.push(onFulfilled)
            this.rejectCallback.push(onRejected)
          }
          if (this.status===Commitment.FULFILLED) {
              onFulfilled(this.result)
          }
          if (this.status === Commitment.REJECTED) {
            onRejected(this.result)
          }
        })
      }
    }
    const commitment = new Commitment((resolve, reject) => {
      resolve('这次一定')
      // throw new Error('报错')
    
    })
    commitment.then(
      result =>{console.log(result)},
      result =>{console.log(result.message)}
    ).then(
      result =>{console.log(result)},
      result =>{console.log(result.message)}
    )
  ```