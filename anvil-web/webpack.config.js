const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const styleLoader = require('./config/styleLoader')
const paths = require('./config/paths')
const themeRc = require(paths.themePath)

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: {
    app: [
      // 'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://0.0.0.0:3000',
      '@babel/polyfill',
      require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.appIndex,
    ],
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader', query: { cacheDirectory: true } }],
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        oneOf: [
          {
            test: /\.(less|css)$/,
            exclude: /\.module\.(css|less)$/,
            use: styleLoader({
              MiniCssExtractPlugin,
              preprocessor: 'less',
              preprocessorOption: {
                javascriptEnabled: true,
                modifyVars: themeRc.lessVars,
              },
            }),
          },
          {
            test: /\.module\.css$/,
            use: styleLoader({ MiniCssExtractPlugin, cssModules: true }),
          },
          {
            test: /\.(sass|scss)$/,
            exclude: /\.module\.(sass|scss)$/,
            use: styleLoader({ MiniCssExtractPlugin, preprocessor: 'sass' }),
          },
          {
            test: /\.module\.(sass|scss)$/,
            use: styleLoader({ MiniCssExtractPlugin, preprocessor: 'sass', cssModules: true }),
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin({
      'process.env': isDev,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
  node: {},
  performance: {},
  optimization: {
    minimize: !isDev,
  },
}
