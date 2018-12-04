const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

const postcssOption = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      flexbox: 'no-2009',
    }),
  ],
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: {
    app: [
      // 'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://0.0.0.0:3000',
      '@babel/polyfill',
      require.resolve('react-dev-utils/webpackHotDevClient'),
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'index.js'),
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
        use: ['babel-loader'],
        exclude: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.(s?css)|(less)$/,
        oneOf: [
          {
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'sass-loader',
              { loader: 'postcss-loader', options: postcssOption },
            ],
          },
          {
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              { loader: 'less-loader' },
              { loader: 'postcss-loader', options: postcssOption },
            ],
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
    minimize: isDev,
  },
}
