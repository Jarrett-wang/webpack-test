/* eslint-disable no-undef */
/* eslint no-console: 0 */
const fse = require('fs-extra');
const colors = require('colors');
const { execSync } = require('child_process');

class BuildLib {
  constructor() {
    process.env.NODE_ENV = 'production';
  }

  run() {
    this.removeLibFolder();
    this.build();
  }

  removeLibFolder() {
    console.log(colors.green(`Remove lib folder!\n`));
    fse.removeSync('./lib');
  }

  build() {
    const watchOps = process.argv.indexOf('-w') > -1 ? '-w' : '';
    execSync(`npx babel ./src ${watchOps} -d ./lib`, { stdio: 'inherit' });
  }
}

new BuildLib().run();
