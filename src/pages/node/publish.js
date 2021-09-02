/* eslint-disable no-undef */
/* eslint no-console: 0 */
const path = require('path');
const fse = require('fs-extra');
const colors = require('colors');
const { execSync } = require('child_process');

class Publish {
  constructor() {
    this.enablePublishFolder = ['./lib', 'package.json', 'README.md', 'CHANGELOG.md'];
    this.targetFolder = './publish';
    this.publishTag = process.argv[2];
    this.publishAccess = process.argv[3];
    this.publishScope = '@weiwenjia';
  }

  run() {
    Publish.removePublishFolder();

    this.createPublishFold(this.enablePublishFolder, this.targetFolder);
    this.setScope();
    this.publish();
  }

  setScope() {
    execSync(`npm init --scope=${this.publishScope}`, { stdio: 'inherit' });
  }

  publish() {
    const tag = this.publishTag ? `--tag=v${this.publishTag.split('@')[1]}` : '';
    const access = this.publishAccess ? `--access=${this.publishAccess.split('=')[1]}` : '--access=public';
    execSync(`npm publish ./publish ${tag} ${access}`, { stdio: 'inherit' });
  }

  // 复制需要发布的文件到 publish 目录中
  createPublishFold(src, tar) {
    const isExists = Publish.isExists(tar);
    if (!isExists) {
      fse.mkdirSync(tar);
    }

    if (src instanceof Array) {
      src.forEach(item => {
        const isExists = fse.statSync(item);
        if (isExists && isExists.isDirectory()) {   // 文件夹
          Publish.exists(item, path.join(tar, item), this.copyDirSync.bind(this));
        } else if (isExists && isExists.isFile()) {    // 文件
          Publish.copyFile(item, path.join(tar, item));
        }
      });
    }
  }

  /*
   * 复制目录中的所有文件包括子目录
   * @param {string} 需要复制的目录
   * @param {string} 复制到指定的目录
   */
  copyDirSync(srcDir, tarDir) {
    const paths = fse.readdirSync(srcDir);
    if (paths) {
      paths.forEach(childPath => {
        const srcPath = `${srcDir}/${childPath}`;
        const tarPath = `${tarDir}/${childPath}`;
        let stat = fse.statSync(srcPath);

        if (stat.isFile()) {
          Publish.copyFile(srcPath, tarPath);
        } else if (stat.isDirectory()) {
          Publish.exists(srcPath, tarPath, this.copyDirSync);
        }
      });
    }
  }


  /**
   * 如果目标路径不存在，则创建
   * @param src
   * @param tar
   * @param callback
   */
  static exists(src, tar, callback) {
    const isExists = Publish.isExists(tar);
    if (isExists) {
      callback(src, tar);
      return;
    }

    fse.mkdirSync(tar);
    callback(src, tar);
  }

  /**
   * 同步检查当前路径目录或文件是否存在
   * @param src
   */
  static isExists(src) {
    try {
      fse.accessSync(src);
      return true;
    } catch(err) {
      return false;
    }
  }

  /**
   * 创建读取/写入流
   * @param srcPath  读取流的路径
   * @param tarPath  写入流的路径
   */
  static copyFile(srcPath, tarPath) {
    fse.writeFileSync(tarPath, fse.readFileSync(srcPath));
  }

  static removePublishFolder() {
    console.log(colors.green(`Remove publish folder!\n`));
    fse.removeSync('./publish');
  }
}

new Publish().run();
