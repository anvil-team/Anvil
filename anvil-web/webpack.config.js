const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const styleLoader = require('./config/styleLoader');
const paths = require('./config/paths');
const themeRc = require(paths.themePath);
const plugins = require('./config/plugins');

const isDev = process.env.NODE_ENV !== 'production';
const cssFilename = 'static/css/[name].[contenthash:8].css';
const cssChunkFilename = 'static/css/[id].[hash].css';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: {
    app: isDev
      ? [
          // 'react-hot-loader/patch',
          // 'webpack-dev-server/client?http://0.0.0.0:3000',
          '@babel/polyfill',
          require.resolve('react-dev-utils/webpackHotDevClient'),
          paths.appIndex,
        ]
      : ['@babel/polyfill', paths.appIndex],
  },
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
    chunkFilename: isDev ? '[name].[chunkhash].js' : 'static/js/[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      '@ant-design/icons/lib/dist$': paths.antdIcon,
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
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV,
    }),
  ].concat(
    isDev
      ? [
          new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            chunksSortMode: 'none',
          }),
          new webpack.HotModuleReplacementPlugin(),
          new FriendlyErrorsPlugin(),
        ]
      : [
          new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            chunksSortMode: 'none',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }),
          new MiniCssExtractPlugin({
            filename: cssFilename,
            chunkFilename: cssChunkFilename,
          }),
          new SWPrecacheWebpackPlugin({
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'sw.js',
            logger(message) {
              if (message.indexOf('Total precache size is') === 0) {
                return;
              }
              if (message.indexOf('Skipping static resource') === 0) {
                return;
              }
            },
            minify: true,

            navigateFallback: '/index.html',

            navigateFallbackWhitelist: [/^(?!\/__).*/],

            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
          }),
          new plugins.FilterCssConflictingWarning(),
        ]
  ),
  node: {},
  performance: {},
  optimization: {
    nodeEnv: process.env.NODE_ENV,
    minimize: !isDev,
    minimizer: isDev
      ? []
      : [
          new UglifyJsWebpackPlugin({
            parallel: true,
            sourceMap: false,
            cache: true,
            uglifyOptions: {
              compress: {
                warnings: false,
                comparisons: false,
              },
              mangle: true,
              output: {
                comments: false,
                ascii_only: true,
              },
            },
          }),
          new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css\.*(?!.*map)/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
              discardComments: { removeAll: true },
              autoprefixer: false,
              parser: require('postcss-safe-parser'),
            },
            canPrint: true,
          }),
        ],
  },
  stats: {
    builtAt: true,
    colors: true,
    errors: true,
  },
};
