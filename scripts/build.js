/* eslint-disable no-undef */
/* eslint no-console: 0 */
const fse = require('fs-extra');
const path = require('path');
const colors = require('colors');
const { execSync } = require('child_process');

class WebpackBuild {
  constructor() {
    this.server = process.argv[2] || 'dev';
    this.distPath = path.resolve('./dist');
    this.tarPath = `${this.distPath}/dianxiao.tar.gz`;
    this.serverConfig = require(path.resolve(`./config/servers/${this.server}.config`));
    process.env.SERVER_ENV = this.server;
    process.env.NODE_ENV = 'production';
  }

  run() {
    this.removeDistFolder();
    this.build();
    this.pack()
  }

  removeDistFolder() {
    console.log(colors.green(`Remove dist folder!\n`));
    fse.removeSync(this.distPath);
  }

  build() {
    execSync('webpack --progress', { stdio: 'inherit' });
  }

  pack() {
    console.log(colors.green(`Pack project!\n`));
    execSync(`tar -czvf ${this.tarPath} -C ./dist ${this.serverConfig.buildPath}`, { stdio: 'inherit' });
  }

}

new WebpackBuild().run();
