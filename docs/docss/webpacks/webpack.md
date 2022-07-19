# webpack打包

# 模块打包工具的由来


🚫 ES Modules存在环境兼容问题

模块文件过多，网络请求频繁

所有的资源都需要模块化(css,html,js......)



理想的模块化解决方案

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e632c9f-1e92-4d53-926b-cfd4e718db67/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e632c9f-1e92-4d53-926b-cfd4e718db67/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/406ee409-ac2e-4275-a895-3c7cf4fe53ef/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/406ee409-ac2e-4275-a895-3c7cf4fe53ef/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4374f73c-c2dd-4dbb-9e97-94ad9e3b976c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4374f73c-c2dd-4dbb-9e97-94ad9e3b976c/Untitled.png)

### webpack如何解决这些问题

1. 模块打包器(Module bundler)
2. 模块加载器(loader)
3. 代码拆分(code splitting)
4. 资源模块(Asset Module)


🍓 对整个前端系统的打包，不仅仅是js文件



# Webpack

## 基本使用

安装: `yarn add webpack webpack -D`

配置package.json

```jsx
{
  "name": "base",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.36.2",
    "webpack-cli": "^4.6.0"
  }
}
```

运行`yarn build` 即可进行打包

## webpack配置文件

默认情况下`src/index.js => dist/mainn.js`

```jsx
// .webpack.config.js
const path = require("path");
module.exports = {
	// 入口文件
  entry: "./src/main.js",

	// 打包文件
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "output"),
  },
};
```

### wepback工作模式

默认production，会压缩优化代码

开发模式`yarn webpack --mode development`

原始模式`yarn webpack --mode development`

配置文件中配置

```jsx
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "output"),
  },
};
```

## 资源模块加载

### css处理


🍓 css-loader style-loader
如果只配置了css-loader，并不能让css工作，因为css-loader只负责转化css，并不能给你应用文件，所以还需要style-loader将样式添加到页面
style-loader
会将样式以style标签形式添加到页面



```jsx
const path = require("path");
module.exports = {
 // ......
  module: {
    rules: [
      {
        test: /.css$/, // 匹配文件路径
				// loader从后面往前面执行
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```


💡 loader是前端模块化的核心，使用loader可以加载任何的资源



### 导入资源模块

根据代码的需要动态导入资源，需要资源的不是应用，而是此时编写的代码


💡 js驱动了整个前端应用
逻辑合理，js确实需要这些文件
确保上线资源文件不会缺失，都是必要的



![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01b9059b-ac53-42fc-bf8d-11673591468f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01b9059b-ac53-42fc-bf8d-11673591468f/Untitled.png)

### 文件资源加载器


💡 file-loader用来解析图片
需要配置publicPath ⇒wepback默认所有结果都在网站根目录，所以需要指定dist目录为根目录



```jsx
output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
  },

// ------

module: {
    rules: [
      {
        test: /.jpg$/,
        use: "file-loader",
      },
    ],
  },
```

引入方式

```jsx
import createHeading from "./heading.js";
import girl from "./assets/girl.jpg";
import "./main.css";

const heading = createHeading();

document.body.append(heading);

const img = new Image();
img.src = girl;
img.width = 200;

document.body.append(img);
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/328dd507-fe0b-468b-84a5-c50fdff4851a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/328dd507-fe0b-468b-84a5-c50fdff4851a/Untitled.png)


💡 Data Urls处理文件
url中已经包含了文件信息，浏览器不用重新发起新的请求,即可解析文件
如果图片或者二进制文件，通过base64格式来表示文件
只适合体积比较小的资源



![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/658fc789-2dd0-497e-aa1f-c39911384be3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/658fc789-2dd0-497e-aa1f-c39911384be3/Untitled.png)

使用`url-loader`来解析图片：

```jsx
module: {
    rules: [
      {
        test: /.jpg$/,
        use: "url-loader",
      },
    ],
  },
```


💡 最佳实践
小文件使用Data Urls，减少请求次数
大文件单独存放，提高加载速度



```jsx
// 超过10KB 使用file-loader，需要安装file-loader
{
    test: /.jpg$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 10 * 1024, // 10KB
      },
    },
  },
```

## 常见加载器分类


💡 用来处理各种资源文件



### 编译转化类

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/58265a41-51da-401f-8697-9361fa45706b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/58265a41-51da-401f-8697-9361fa45706b/Untitled.png)

### 文件加载类

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b655f7a0-8ba5-4763-9b79-550f748aef1c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b655f7a0-8ba5-4763-9b79-550f748aef1c/Untitled.png)

### 代码检查类

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0680479a-49b4-4fe9-96c6-d96fb792e4d7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0680479a-49b4-4fe9-96c6-d96fb792e4d7/Untitled.png)

## webpack与ES2015


💡 因为模块打包需要，所以处理import和export
并不转换es6新特性




💡 如何转化es6
使用babel-loader
还需要安装@babel/core @babel/preset-env
插件才能实现转化功能



```jsx
rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      }
]
```

## 加载资源方式

1. es Modules标准的import声明
2. 遵循commonjs的require函数
3. 遵循AMD的define函数和require函数
    
    ---
    
4. loader加载的非js也会触发资源加载
    - 样式代码中的@import指令和url函数
5. html代码中图片标签的src属性


🚫 三种规范不建议混合使用



加载html，以及内置的标签转化配置

```jsx
{
  test: /.html$/,
  use: {
    loader: "html-loader",
    options: {
      sources: {
        list: [
          {
            attribute: "src",
            type: "src",
          },

          {
            attribute: "href",
            type: "src",
          },
        ],
      },
    },
  },
},
```

## webpack核心工作原理


💡 loader是webpack的核心机制



![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08852586-3bbf-404a-8d1c-dedec7e61c67/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08852586-3bbf-404a-8d1c-dedec7e61c67/Untitled.png)

## loader的工作原理(开发一个自己的loader)


💡 开发一个处理markdown的loader




💡 核心原理：
输入到输出的转换
工作管道：同一个资源可以使用多个loader



定义自己的loader文件

```jsx
// marked 用来解析markdown文件
const marked = require("marked");

module.exports = (src) => {
  // src为接收到的资源
  // loader返回的必须是一段js代码
  const html = marked(src);
  // return `module.exports = ${JSON.stringify(html)}`;
  // return `export default ${JSON.stringify(html)}`;

  // 返回html，交给下一个loader处理
  return html;
};
```


💡 返回的必须是可执行的js代码
支持commonjs导出
支持es Modules导出
也可以交给html-loader去处理html字符



```jsx
module: {
    rules: [
      {
        test: /.md$/,
        use: ["html-loader", "./markdown-loader"],
      },
    ],
  }
```

loader工作流程

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f57170a1-f1a8-428c-908f-ff0bb16eb923/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f57170a1-f1a8-428c-908f-ff0bb16eb923/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5684dd2f-c857-44ab-beaa-2d7c941cdb31/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5684dd2f-c857-44ab-beaa-2d7c941cdb31/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/95ad0e75-10f3-42ef-a32b-07b4740964a3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/95ad0e75-10f3-42ef-a32b-07b4740964a3/Untitled.png)

## 插件机制 Plugin


👉🏻 增强项目自动化能力



1. 清除dist
2. 拷贝静态资源
3. 压缩输出代码
4. ......

### 自动清除目录插件


👉🏻 clean-webpack-plugin

构建前自动清除dist



```jsx
// ....
plugins: [new CleanWebpackPlugin()],
// ....
```

自动生成html插件


👉🏻 html-webpack-plugin



```jsx
plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
```

自定义配置

```jsx
plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "web App",
      meta: {
        viewport: "width=device-width",
      },
      template: "./src/index.html",
    }),
  ],
```

html文件

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div class="container">
      <h1><%= htmlWebpackPlugin.options.title %></h1>
    </div>
  </body>
</html>
```


👉🏻 拷贝文件插件：copy-webpack-plugin



```jsx
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 拷贝文件插件
new CopyWebpackPlugin({
  patterns: ["public"],
}),
```

## plugin原理


👉🏻 钩子机制



插件就是一个具有apply方法的对象

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/87498fd1-46b5-40a6-86b7-31aea19f78c5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/87498fd1-46b5-40a6-86b7-31aea19f78c5/Untitled.png)

```jsx
class MyPlugin {
  apply(complier) {
    // webpack打包钩子上注册方法
    complier.hooks.emit.tap("MyPlugin", (complilation) => {
      console.log("webpack构建开始~~");
      // complilation打包的上下文
      for (const name in complilation.assets) {
        // console.log(name);
        if (name.endsWith(".js")) {
          const contents = complilation.assets[name].source();
          const withOutSource = contents.replace(
            /(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g,
            ""
          );
          complilation.assets[name] = {
            source: () => "withOutSource", // 函数的返回值会被写入到对应的文件里边
            size: () => withOutSource.size, // 文件的尺寸，webpack要求必须配置
          };
        }
      }
    });
  }
}

plugins: [
    new MyPlugin(),
  ],
```


👉🏻 可以配置 —watch监听文件变化，自动进行打包



## webpack-dev-server

### 配置静态资源访问


👉🏻 开发环境下不用每次使用copy插件，只需要上线配置copyplugin就可以就可以，



```jsx
devServer: {
  // 开发环境不用每次打包，只需要可以访问到就可以
  contentBase: ["./public"], // 配置资源路径
},
```

运行`webpack serve`即可访问 

### 代理API

```jsx
devServer: {
  // 开发环境不用每次打包，只需要可以访问到就可以
  contentBase: ["./public"], // 配置资源路径
  proxy: {
    // 监听请求路径前缀
    "/api": {
      // 为前缀匹配的代理规则
      // http://localhost:8080/api/users ==> https://api.github.com/api/users
      target: "https://api.github.com",
			// 把路径中的api替换为空
      pathRewrite: {
        "^/api": "",
      },
      // 不能使用localhost:8080作为github主机名
      // 如果为 true  则使用代理地址作为请求的主机名
      changeOrigin: true,
    },
  },
}
```

## source Map


👉🏻 编写的源代码跟实际打包出的代码不一致的调试问题，需要source Map来转化



```jsx
devtool: "source-map"
```

### 各种模式的source-map

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6feac0ef-faef-4441-adb9-113ce17b58b0/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6feac0ef-faef-4441-adb9-113ce17b58b0/Untitled.png)

### eval模式

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e5f2fa1-4098-415b-87e8-e77cbcd7c784/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e5f2fa1-4098-415b-87e8-e77cbcd7c784/Untitled.png)


👉🏻 不会构建sourcemap文件，执行代码是通过eval执行，通过注释告诉浏览器代码的所处文件
速度最快，但是只能定位文件，不能定位行列信息



### eval-source-map


👉🏻 可以定位行列，因为生产了source-map



### cheap-eval-source-map


👉🏻 阉割版的source-map 只有行没有列



### cheap-module-eval-source-map


👉🏻 只能定位到行，但是保留了自己写的源代码，不会通过babel转义



### 总结

1. eval-是否使用eval执行模块代码
2. cheap- source-map是否包含行信息
3. module- 是否够得到Loader处理之前的源代码
4. inline source-map是否出现在源文件中
5. hidden打包出source-map但是不引入主文件
6. no-source-map 能定位到行列，但是提示的文件为空，生产环境为了保护源代码

## 如何选择source-map

### 开发环境


👉🏻 cheap-module-eval-source-map



### 生产模式


👉🏻 none source-map会暴露源代码



## HMR热更新


👉🏻 实时替换模块，不同于自动刷新替换原始状态



```jsx
// 配置devserver
devServer: {
    hot: true

// 配置自带的热更新插件
new webpack.HotModuleReplacementPlugin(),
```


❓ 为什么css的热更新开箱即用

css的loader已经处理的热更新逻辑




❓ js的热更新为什么需要手动配置

js的编写没有规律，css只需要覆盖之前的样式文件即可




💡 框架的开发使用是有规律的，框架已经帮我们处理好了js热更新逻辑



### 处理js的热替换

```jsx
// 如果某一个模块更新被手动处理(监听)了，就不会触发刷新
module.hot.accept("./heading", () => {
  console.log("eidit更新了。需要手动处理逻辑了");
	// 可以手动决定重新执行某些js
});
```

### 图片资源的热替换

```jsx
// 监听图片资源的改动，然后手动替换图片地址
module.hot.accept("./assets/girl.jpg", () => {
  img.src = girl;
  console.log();
});
```

## wepback.definePlugin


💡 声明全局变量，一般用来做环境判断



```jsx
new webpack.DefinePlugin({
  env: "'development'",
}),

// main.js

console.log(env) // 'development'
```

## treeShaking


💡 production模式下自动开启treeshaking




📚 `usedExports` 负责标记哪些方法未被使用

`minimize` 负责把这些未使用的方法移除掉
`concatenateModules` 尽可能合并每一个模块到一个函数中



```jsx
module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    // concatenateModules: true,
    // sideEffects: false,
    // 压缩输出结果，如果未被使用的代码会被移除掉
    // minimize: true
  },
};
```

### treeshaking和babel


📚 treeshaking必须打包的代码使用**ESM**



最新版本babel-loader默认会禁用掉commonjs的转化，所有默认情况treeshaking还是可以生效的

```jsx
module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: "commonjs" }]],
          },
        },
      },
    ],
  },
```


📚 如果使用了commonjs的转化，最终转化的代码不支持treeshaking



### sideEffects


📚 用于标记当前npm包是否有副作用




📚 所以其实 webpack 里的 sideEffects: false 的意思并不是我这个模块真的没有副作用，而只是为了在摇树时告诉 webpack：我这个包在设计的时候就是期望没有副作用的，即使他打完包后是有副作用的，webpack 同学你摇树时放心的当成无副作用包摇就好啦！。



使用方法：两种配置方法

```jsx
// package.json
{
    "sideEffects": false
}
// antd package.json
{
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*"
  ]
}
```

```jsx
// wwebpack.config.js
optimization: {
    // 检查当前模块是否有副作用
    sideEffects: true,
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    // concatenateModules: true,
    // 压缩输出结果
    // minimize: true,
  },
```


⚠️ 要确保当前模块没有副作用，否则需要单独声明副作用



## 代码分割 code spliting

## 动态导入

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fbce7fe5-0ab4-4bde-8da1-c33fd573e9f2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fbce7fe5-0ab4-4bde-8da1-c33fd573e9f2/Untitled.png)

```jsx
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

const viewsPath = path.resolve(__dirname, "./src/views");
const dirs = fs.readdirSync(viewsPath);
const plugins = [];
const entries = {};

// 定义打包生成的文件夹
const distPath = path.resolve(__dirname, "./dist");
dirs.forEach((dir) => {
  entries[dir] = `${viewsPath}/${dir}/index.js`;

  plugins.push(
    new HtmlWebpackPlugin({
      inject: "body", // 文件注入的位置
      chunks: [dir, "vendors"], // 允许被注入的chunk
      filename: `${distPath}/${dir}/index.html`, // 生成的文件
      template: `${viewsPath}/${dir}/index.html`, // 使用的模板文件
    })
  );
});

module.exports = {
  mode: "none",
  entry: entries,
	// 提取公共文件
	optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    filename: "[name]/[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), ...plugins],
};
```


💡 需要配置optimization属性，来提取公共模块



### 按需加载


💡 需要某个模块时候再导入模块

动态导入会自动分包




💡 魔法注释：

可以使用/* webpackChunkName: 'components'给分包的包重命名



```jsx
// import posts from './posts/posts'
// import album from './album/album'

const render = () => {
  const hash = window.location.hash || "#posts";

  const mainElement = document.querySelector(".main");

  mainElement.innerHTML = "";

  if (hash === "#posts") {
    // mainElement.appendChild(posts())
		// 魔法注释
    import(/* webpackChunkName: 'components' */ "./posts/posts").then(
      ({ default: posts }) => {
        mainElement.appendChild(posts());
      }
    );
  } else if (hash === "#album") {
    // mainElement.appendChild(album())
    import(/* webpackChunkName: 'components' */ "./album/album").then(
      ({ default: album }) => {
        mainElement.appendChild(album());
      }
    );
  }
};

render();

window.addEventListener("hashchange", render);
```

## MiniCssExtractPlugin


💡 抽离css文件



```jsx

module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtraPlugin.loader, "css-loader"],
      },
    ],
  },

new MiniCssExtraPlugin(),
```

## OptimizeCssAssetsWebpackPlugin


💡 压缩输出的css文件



```jsx
const OptiMiniCss = require("optimize-css-assets-webpack-plugin");

module.exports = {
	// ....
	// 正式环境才会开启压缩，才让压缩css生效
	optimization: {
    minimizer: [new TerserWebpackPlugin(), new OptiMiniCss()],
  },
}
```


💡 如果设置了这个插件，需要再配置js的压缩插件



## hashName

1. 项目级别hash，只要任何地方改动，全部 hash变化
    
    ```jsx
    filename: "[name].bundle.[hash].js",
    ```
    
2. chunkHash，同一路的hash改变了就改变hash
3. contentHash,文件hash，不同的文件有不同的hash

💡 指定位数的hash
filename: '[name].[contenthash:8.js]'
