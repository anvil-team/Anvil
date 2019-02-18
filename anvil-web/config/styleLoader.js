const isDev = process.env.NODE_ENV !== 'production'

module.exports = (styleOptions) => {
  const loaders = []
  if (isDev) loaders.push({ loader: 'style-loader' })
  else loaders.push({ loader: styleOptions.MiniCssExtractPlugin.loader })

  // 是否使用css-modules
  const cssOptions = { importLoaders: 1 + styleOptions.preprocessor ? 1 : 0, minimize: !isDev }
  if (styleOptions.cssModules) {
    cssOptions.modules = true
    cssOptions.localIdentName = 'anvil-[folder]__[local]___[hash:base64:5]'
  }
  loaders.push({ loader: 'css-loader', options: cssOptions })

  // 使用 postcss-loader
  loaders.push({
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')({
          autoprefixer: {
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
  })

  // 使用什么预编译style
  if (styleOptions.preprocessor) {
    const preprocessorLoader = {
      loader: `${styleOptions.preprocessor}-loader`,
    }
    if (styleOptions.preprocessorOption)
      preprocessorLoader.options = styleOptions.preprocessorOption

    loaders.push(preprocessorLoader)
  }

  return loaders
}
