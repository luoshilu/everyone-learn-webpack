# 使用Loader加载css

在js中，导入css模块

```
// index.js
// 通过 CommonJS 规范导入 CSS 模块
require('./css/main.css');
```

npm start

执行后会报错

```
ERROR in ./src/css/main.css 1:0
Module parse failed: Unexpected character '#' (1:0)
You may need an appropriate loader to handle this file type
...
```

这时需要配置loader，用于处理非javascript的文件模块(webpack开箱支持javascript模块)。

## 配置css loader

Loader有3种使用方式，分别为：配置，内联，CLI，通常都使用配置(webpack.config.js)。

```
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  }
```

如上配置告诉 Webpack 在遇到以 .css 结尾的文件时先使用 css-loader 读取 CSS 文件，再交给 style-loader 把 CSS 内容注入到 JavaScript 里。

值得注意的是，loader有一些特征：

- use的值是loader的名称字符串数组或对象数组
- loader接收查询参数，用于对 loader 传递配置，也可使用options对象进行配置

## 安装依赖
> cnpm i --save-dev style-loader css-loader
