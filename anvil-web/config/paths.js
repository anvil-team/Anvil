const path = require('path');
const fs = require('fs');

const resolveApp = (relativePath) => path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  themePath: resolveApp('.theme-rc.js'),
  pkgPath: resolveApp('package.json'),
  webpackPath: resolveApp('webpack.config.js'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
  appIndex: resolveApp('src/index.js'),
  antdIcon: resolveApp('src/icons.js'),
  appBuild: resolveApp('app/public')
};
