## 解决问题

### {loader: MiniCssExtractPlugin.loader}和 style-loader 共存问题

{loader: MiniCssExtractPlugin.loader} 的作用是将css从js抽取出来，而style-loader有为CSS提供热模块加载的功能，当两者共存时，功能会受到影响。

所以，我们需要判断当前构建环境，开发环境使用 style-loader，生产环境使用 MiniCssExtractPlugin.loader。

修改package.json script
```
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production --env.NODE_ENV=local --env.production --progress",
    "server": "webpack-dev-server --open --env.NODE_ENV=local --env.development --progress"
  },
```

webpack.config.js

```
module.exports = env => {
  const isDev = !env || !env.production

  return  {
    module: {
      rules: [
        {
          // 用正则去匹配要用该 loader 转换的 CSS 文件
          test: /\.css$/,
          use: [
            isDev? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
      ]
    }
  }
}
```


