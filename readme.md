## 资源管理

### 加载字体

和图片文件一样，处理字体也使用file-loader.

webpack.config.js
```
module: {
  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: `font/[name].[ext]`,
          }
        }
      ]
    }
  ]
```

main.css
```
@font-face {
  font-family: "my-font";
  src: url('../font/Arvo-Regular.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

* {
  font-family: 'my-font'!important;
}
```

执行npm run build后，Arvo-Regular.ttf文件则输出到dist/font目录下，打开index.html，就能看到效果。