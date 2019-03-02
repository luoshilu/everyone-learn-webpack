## 加载资源

在2，3节中，已经尝试过将css作为模块进行加载，并将其内容作为单一文件提取出来。
其实除了css以外，还有图片，文字，数据等资源都作为模块进行加载。

### 加载图片

现在，尝试着在css中，引入一个图片

```
// css/main.css
.head-img {
  width: 150px;
  height: 150px;
  background-image: url('../img/head.png')
}
```

```
// index.html
<header>
    <div class="head-img"></div>
</header>
```

如果此时执行npm start，则会得到一个错误
> ERROR in ./src/img/head.png 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type
...

之前加载css时，我们需要 style-loader 和css-loader来处理css文件，而对于图片，则需要file-loader来处理。

下载file-loader
> cnpm install --save-dev file-loader

配置webpack.config.js
```
  rules: [
    ...
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }
  ]
```
再次执行npm start，如果一切顺利，在dist目录下则生成一张图片文件，文件名类似于*0b51225ae...5892a.png*。
在浏览器中预览index.html，就可看到效果，检查图片元素，打包文件的图片引用链接改变为 *0b51225ae...5892a.png* 的链接。

通常情况下，我们需要将图片单独存到一个目录并且保持源文件的名称，配置file-loader如下：
```
  rules: [
    ...
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: `img/[name].[ext]`,
          }
        }
      ]
    }
  ]
```

若需要对图片进行压缩优化等处理，查看 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 和 [url-loader](https://www.webpackjs.com/loaders/url-loader/)。
