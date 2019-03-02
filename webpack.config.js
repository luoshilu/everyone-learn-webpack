const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  const isDev = !env || !env.production

  return  {
    // JavaScript 执行入口文件
    entry: {
      app: './src/app.js',
      index: './src/index.js'
    },
    output: {
      // 把所有依赖的模块合并输出到一个 bundle.js 文件
      filename: isDev? '[name].bundle.js' : '[name].[hash].bundle.js',
      // 输出文件都放到 dist 目录下
      path: path.resolve(__dirname, './dist'),
    },
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
        },
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
        },
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
    },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        // 从 .js 文件中提取出来的 .css 文件的名称
        filename: `[name].css`
      }),
      new HtmlWebpackPlugin({
        title: "Output management",
        template: "./index.html"
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: './dist',
      hot: true
    }
  }
};