# 使用 Plugin

plugin是用来扩展webpack功能的，这个webpack带来很大的灵活性。
webpack在构建流程中提供了不同的钩子，plugin则通过注入这些钩子进行实现。

## 提取css文件
上节在index.js文件中引入了一个css文件，并将其打包输出到bundle.js中，而通常情况下，我们需要将css文件单独提取出来，这样不仅让文件目录显得直观，并且可以使页面加载得以优化。

### 配置

在原来的基础上，添加以下配置
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  ...
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name].css`,
    })
  ]
};
````

下载依赖
> cnpm install --save-dev mini-css-extract-plugin