const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: "./scripts/script.js" },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        loader: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },     
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff2|woff)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: 'file-loader'
      },
      // аналогично добавьте правило для работы с html
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
      },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin(),
  ] ,
};