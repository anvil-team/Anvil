'use strict';

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const ora = require('ora');
const paths = require('../config/paths');
const webpackConfig = require(paths.webpackPath);
const fse = require('fs-extra');


const complier = webpack(webpackConfig);
const spinner = ora();

// fse.emptyDirSync(paths.appBuild);
fse.copySync(paths.appPublic, paths.appBuild);

function build() {
  spinner.start('start build ...');
  return new Promise((resolve, reject) => {
    complier.run((errors, stats) => {
      if (errors) {
        spinner.stop('build failed');
        return reject(errors);
      }
      resolve(stats);
    });
  });
}

function printStats(stats) {
  process.stdout.write(
    '\n\n' +
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) +
      '\n\n'
  );
  console.log('\n used time:', (stats.endTime - stats.startTime) / 1000, 's');
}

build().then((stats) => {
  printStats(stats);
  spinner.succeed('build success.');
});
