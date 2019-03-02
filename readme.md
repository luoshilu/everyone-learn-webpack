## 资源管理

### 加载数据

webpack可以加载的资源还有数据，例如：json文件,CSV,TSV和XML，其中json时内置支持的，而CSV,TSV,XML则需要loader的支持。

下载loader
> cnpm install --save-dev csv-loader xml-loader

webpack.config.js

```
module: {
  rules: [
    {
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader'
      ]
    },
    {
      test: /\.xml$/,
      use: [
        'xml-loader'
      ]
    }
  ]
}
```

// index.js
```
import data from './data/data.xml'
console.log(data)
```

import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何一种，所导入的 Data 变量将包含可直接使用的已解析 JSON。
打开index.html，控制台将打印出这个json对象。

