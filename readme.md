## 环境构建

> cnpm install --save-dev webpack
> cnpm install --save-dev webpack-cli

## 编辑package.json

```
{
  "name": "webpack-base-use",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "webpack --mode development" // 使用mode指定开发环境development
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  }
}
```

## 启动

> npm start

```
> webpack-base-use@1.0.0 start C:\Users\qingyi\Desktop\熟练使用webpack\webpack-base
> webpack --mode development

Hash: aa5de79504e73cd5c150
Version: webpack 4.29.6
Time: 156ms
Built at: 2019-03-01 16:38:35
Asset      Size  Chunks             Chunk Names
main.js  4.33 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 93 bytes {main} [built]
[./src/show.js] 181 bytes {main} [built]

```