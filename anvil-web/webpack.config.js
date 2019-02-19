const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
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
  entry: isDev
    ? ['@babel/polyfill', require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndex]
    : {
        app: ['@babel/polyfill', paths.appIndex],
        react: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom'],
      },

  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: isDev ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
    libraryTarget: 'umd',
    chunkFilename: isDev ? '[name].[chunkhash].js' : 'static/js/[name].[chunkhash:8].js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      config: path.resolve(__dirname, 'src/config'),
      services: path.resolve(__dirname, 'src/services'),
      utils: path.resolve(__dirname, 'src/utils'),
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
            exclude: /\.global\.(css|less)$/,
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
            test: /\.css$/,
            use: styleLoader({ MiniCssExtractPlugin, cssModules: true }),
          },
          {
            test: /\.(sass|scss)$/,
            exclude: /\.global\.(sass|scss)$/,
            use: styleLoader({ MiniCssExtractPlugin, preprocessor: 'sass', cssModules: true }),
          },
          {
            test: /\.global\.(sass|scss)$/,
            use: styleLoader({ MiniCssExtractPlugin, preprocessor: 'sass' }),
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
        BASE_URL: `'${process.env.BASE_URL || ''}'`,
        API_VERSION: `'${process.env.API_VERSION || ''}'`,
        VERSION: `'${process.env.VERSION || require(paths.pkgPath).version}'`,
      },
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
          new ManifestPlugin({ fileName: 'asset-manifest.json' }),
          new webpack.HashedModuleIdsPlugin(),
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
          new CompressionWebpackPlugin({
            threshold: 10 * 1024,
          }),
        ]
  ),
  node: {},
  performance: {},
  optimization: {
    nodeEnv: process.env.NODE_ENV,
    runtimeChunk: isDev,
    splitChunks: isDev
      ? {}
      : {
          chunks: 'async',
          name: true,
          cacheGroups: {
            external: {
              name: 'external',
              chunks: 'all',
              priority: -10,
              test: /[\\/]node_modules[\\/](dayjs|nprogress|connected-react-router)[\\/]/,
            },
          },
        },
    minimize: !isDev,
    minimizer: isDev
      ? []
      : [
          new TerserPlugin({
            parallel: true,
            sourceMap: true,
            cache: true,
            terserOptions: {
              parse: { ecma: 8 },
              compress: { ecma: 5, warnings: false, comparisons: false, inline: 2 },
              mangle: { safari10: true },
              output: { ecma: 5, comments: false, ascii_only: true },
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
