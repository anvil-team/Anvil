'use strict'

process.env.NODE_ENV = 'development'

// const fse = require('fs-extra')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const ora = require('ora')
// const clearConsole = require('react-dev-utils/clearConsole')
const openBrowser = require('react-dev-utils/openBrowser')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const config = require('../webpack.config')

const host = process.env.HOST || '0.0.0.0'
const port = parseInt(process.env.PORT, 10) || 3000
const spinner = ora('complier...').start()

const complier = webpack(config)
const devServer = new WebpackDevServer(complier, {
  host,
  port,
  watchContentBase: true,
  historyApiFallback: true,
  hot: true,
  public: '127.0.0.1',
  stats: 'errors-only',
  before(app) {
    app.use(errorOverlayMiddleware())
    app.use(noopServiceWorkerMiddleware())
  },
})

devServer.listen(port, host, (error) => {
  if (error) {
    console.error(error)
  }
  spinner.succeed()
  openBrowser('http://127.0.0.1:3000')

  const sigList = ['SIGINT', 'SIGTERM']
  sigList.forEach(function(sig) {
    process.on(sig, function() {
      devServer.close()
      process.exit()
    })
  })
})
