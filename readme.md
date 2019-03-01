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

## 模块热替换
webpack-dev-server启动后，每修改一个依赖文件，webpack会重新build，浏览器会重新加载整个页面。但问题时，当我们的应用程序变得庞大后，每次修改一次，重载过程需要很长时间，开发速度必然会受到很大影响。
而模块热替换则帮助我们解决这个问题，它会在应用程序运行过程中替换、添加或删除模块，只刷新被修改的部分，无需重新加载整个页面，显著提升开发效率。

### 启用HMR
启用HMR很简单，我们只需添加webpack-dev-server的一些配置。

```
// webpack.config.js
const webpack = require('webpack');
...
module.exports = {
  devServer: {
    ...
    hot: true
  },
  plugins: [
    ...
    new webpack.NamedModulesPlugin(), // 便于查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin()
    ],
}

```

配置完成后，需要修改 index.js 文件，**以便当 parent1.js 内部发生变更时可以告诉 webpack 接受更新的模块。**

```
// index.js
import _ from 'lodash';
import parent1 from './parent1.js';
function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello3', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = parent1;
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
+ if (module.hot) {
+  module.hot.accept('./parent1.js', function() {
+    // parent1 发生更新后，执行的回调
+    console.log('Accepting the updated parent1 module!');
+    parent1();
+  })
}
```
```
// parent1.js
export default function parent1() {
  console.log('I get called from parent1.js!');
}
```

配置好过后，此时，我们更改parent1.js中的内容为如下。
```
// parent1.js
export default function parent1() {
  + console.log('Updating parent1.js..')
}
```
浏览器控制台则会输出：
```
client:82 [WDS] App updated. Recompiling...
client:237 [WDS] App hot update...
log.js:24 [HMR] Checking for updates on the server...
index.js:37 Accepting the updated parent1 module!
parent1.js:8 Updating parent1.js..
log.js:24 [HMR] Updated modules:
log.js:24 [HMR]  - ./src/parent1.js
log.js:24 [HMR] App is up to date.
```
非常好，这说明热更新已经生效了。
但是，你会发现，点击界面按钮过后，控制台输出的结果还是 *I get called from parent1.js!*，因为其按钮元素的监听事件并没有被改变。
所以，这时需要在回调函数中，重新对按钮进行监听。
```
document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./parent1.js', function() {
    console.log('Accepting the updated parent1 module!');
    // parent1();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}
```

刚开始，模块热替换或许让人有点难以理解。可能我们一开始就认为webpack会帮我们搞定这一切，根本无需去手动实现这些HMR，凭什么我们要在源代码中编写这些东西！


从模块的角度来说，官方文档给的解释是：
> 在模块中
>HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 style-loader 为 style 样式追加补丁。为了运行追加补丁，style-loader 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

>类似的，当在一个模块中实现了 HMR 接口，你可以描述出当模块被更新后发生了什么。然而在多数情况下，不需要强制在每个模块中写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡(bubble up)。这意味着一个简单的处理函数能够对整个模块树(complete module tree)进行更新。如果在这个模块树中，一个单独的模块被更新，那么整组依赖模块都会被重新加载。

简单来说：**要使HMR功能生效，则需要在模块中实现HMR接口**。如果没有任何一个模块实现HMR，只要有任何一个模块更新了，那么相当于全部模块都被更新，全部模块都进行重载。

举个例子，现在有以下模块依赖关系:
```
      |--parent1.js--|--child
      |--parent2.js--|--child
index-|--show.js
      |--main.css
      
```
其中index是根模块，依赖于parent1,parent2,show,main.css。parent1和parent2又依赖于child。

若只有index模块实现了HMR,接受更新的模块有parent1，则：
> - 当parent1发生更新，会执行对应的index模块中实现的HMR；
> - 当index发生更新，全部进行重载(根模块若发生了更新，则一定会全部重载)；
> - 当parent2发生更新，全部进行重载(parent2的更新会冒泡到index,但index的HMR并没有接受parent2的更新，所以也会导致index进行更新)；
> - 当child发生更新，全部进行重载（虽然child的更新会冒泡到parent1，使parent1发生更新，但是也同时会冒泡到parent2，使得parent2发生更新，所以导致了全部重载）。

若只有parent1模块实现了HMR,接受更新的模块有child:，则
> - 当parent1发生更新，全部进行重载(更新会冒泡到index)；
> - 当child发生更新，全部进行重载(虽然child的更新会被parent的HMR接收，但也会冒泡到parent2，导致parent2和index模块的更新)。

若main.css发生更新，那么也将全部重载。针对css，可借助于 style-loader 的帮助，CSS的模块热替换就会变得相当简单。当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签。index模块也不用再实现HMR去接收main.css。
所以，更新以下两个依赖：

> npm install --save-dev style-loader css-loader
并配置：
```
// webpack.config.js
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [
          'style-loader', // or style-loader
          'css-loader'
        ]
      }
    ]
  },
```
当main.css改变时：
```
body {
  background: red;
}
```
界面不会刷新，但背景变成了red。

所以，不管是什么类型的模块，我们需要借助其它的 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互…
比如有：
- React Hot Loader：实时调整 react 组件。
- Vue Loader：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
- Elm Hot Loader：支持用于 Elm 程序语言的 HMR。
- Redux HMR：无需 loader 或插件！只需对 main store 文件进行简单的修改。
- Angular HMR：没有必要使用 loader！只需对主要的 NgModule 文件进行简单的修改，由 HMR API 完全控制。

