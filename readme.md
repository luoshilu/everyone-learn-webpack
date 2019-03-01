# 使用 DevServer

## 提供开发环境服务

除了能让webpack正常运行，通常在实际开发中还需要以下功能：
- 提供 HTTP 服务而不是使用本地文件预览
- 监听文件的变化并自动刷新网页，做到实时预览
- 支持 Source Map，以方便调试

## 使用webpack-dev-server
webpack-dev-server 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。设置以下：

> cnpm install --save-dev webpack-dev-server

在webpack.config.js中，添加
```
 module.exports = {
  ...
  devServer: {
    contentBase: './dist'
  },
  ...
}
```
以上配置告知 webpack-dev-server, 在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。

在package.json中，添加script脚本

```
"scripts": {
  "server": "webpack-dev-server --open"
}
```

执行命令 npm run server 后，服务器则开始运行，浏览器自动打开访问dist目录。当源文件发生变动时，webpack会自动重新build，浏览器会自动刷新。

