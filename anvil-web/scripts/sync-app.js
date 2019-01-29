const path = require('path');
const chokidar = require('chokidar');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);
const env = process.env;

const appPath = resolveApp('app');

const files = ['app', '.gitignore', 'package-lock.json', 'package.json', 'scripts.js', 'serve.js'];

initial();

const start = () => {
  const watcher = chokidar.watch(appPath, {
    persistent: true,
    ignored: /public/,
  });

  watcher.on('change', (changedPath) => {
    console.log(chalk.yellow(`changed: ${changedPath}`), '\n');
    const basename = path.basename(changedPath);
    if (files.includes(basename)) {
      const ret = syncApp(changedPath);
      if (ret) console.log(chalk.bgGreen(`同步成功: ${basename}`));
      else console.error(chalk.bgRed(`同步失败: ${basename}`));
    } else {
      console.log('ignore:', chalk.underline(changedPath));
    }
  });
};

function initial() {
  spawnSync('scp', ['r', `${appPath}/`, 'zsirfs@39.105.38.144:/home/zsirfs/webroot/']);
  console.log(chalk.bgGreen('sync serve app success.'));
}

function syncApp(absolutePath) {
  try {
    const appRelative = absolutePath.replace(appPath, '');
    const basename = path.basename(absolutePath);

    let scpUrl = 'zsirfs@39.105.38.144:/home/zsirfs/webroot';

    if (appRelative !== basename) {
      const dir = appRelative.replace(basename, '');
      scpUrl += dir;
    }
    spawnSync('scp', [absolutePath, scpUrl]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

exports.start = start;

if (env.DEV) start();
