## 使用sourcemap

当执行打包后的文件时，若发生了错误，开发人员需要准确知道错误来自哪个源文件，source map功能可以做到这一点，这对于开发人员来是很有帮助的。

在webpack.config.js中，配置：
```
devtool: 'inline-source-map',

```
devtool的选项值决定着如何生成source map。
通常情况下：
开发环境，使用 *eval-source-map*
特定场景，使用 *inline-source-map*
生产环境，使用 (node)(省略devtool选项)

主要几个值的特征：
- eval  ： 使用eval()执行模块，不生成source-map；
- eval-source-map  ：使用eval()执行模块，source map 转换为 DataUrl 后添加到 bundle 的 eval() 中，可正确映射原始代码；
- source-map：整个 source map 作为一个单独的文件生成(filename.js.map)，可正确映射原始代码；
- inline-source-map ： source map 转换为 DataUrl 后添加到 bundle 中，可正确映射原始代码；
- (none)： 不生成source-map。

> 注： 执行webpack --mode development命令的默认配置devtool：eval，执行webpack --mode production命令的默认配置devtool：(none)。

配置详情见 [devtool](https://www.webpackjs.com/configuration/devtool/).