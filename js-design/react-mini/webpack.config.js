const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[fullhash].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8686
  }
}