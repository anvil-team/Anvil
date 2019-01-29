const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const resolveApp = (relativePath = '.') => path.resolve(__dirname, relativePath);

exports.restart = () => {
  try {
    const buildPath = resolveApp('public');

    if (fs.existsSync(`${buildPath}/.git`)) {
      spawnSync('git', ['pull', 'origin', 'web-deploy'], {
        cwd: buildPath,
      });
    } else {
      spawnSync(
        'git',
        ['clone', '-b', 'web-deploy', 'https://github.com/anvil-team/Anvil.git', 'public'],
        { cwd: resolveApp() }
      );
    }
  } catch (error) {
    console.error('err', error);
  }
};

exports.install = () => {
  try {
    spawnSync('npm', ['install'], {
      cwd: resolveApp(),
    });
  } catch (error) {
    throw error;
  }
};
