## 管理输出

webpack中有两个重要的概念：入口和出口。且规定只能以js文件作为入口和出口。

入口分为单一入口和多个入口，之前的用例中，都是使用单一入口，下面将尝试更改为多个入口

webpack.config.js
```
  entry: {
    app: './src/app.js', // app为别名
    index: './src/index.js' // index为别名
  },
  output: {
    filename: '[name].bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
```

执行npm run build后，将会子啊dist目录下输出 app.bundle.js和index.bundle.js文件。即入口的别名将会对应着出口的 [name]。

通常，生成环境下打包时，输出的文件需要填充一个hash作为文件名。

```
  output: {
    filename: isDev? '[name].bundle.js' : '[name].[hash].bundle.js',
    ...
  },
```

