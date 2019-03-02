## 插件工具

### HtmlWebpackPlugin

但现在为止，我们要访问的文件index.html一直是手动引入外部文件，比如bundle.js、main.css，而当这些文件名发生改变或目录发生改变，我们需要手动去修改index.html，非常不方便。
HtmlWebpackPlugin插件的功能就是帮我们自动修改index.html中这些被更改的文件名。

更新依赖
> cnpm install --save-dev html-webpack-plugin

```
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'index.html' // 设置一个html模板，指定body内容。
    })
  ],
}
```

### 清除dist目录
每次build过后，dist目录总会余留以前留下的文件，所以，在build前，我们将dist目录清空。

更新依赖
> npm install clean-webpack-plugin --save-dev

```
// webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');
  module.exports = {
    ...
    plugins: [
      new CleanWebpackPlugin(['dist'])
    ]
  };
```
