const path = require("path");
const { NodeSSH } = require("node-ssh");
const deployeConfig = require("./deploy.config.ts");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs");

const ssh = new NodeSSH();
const remoteDir = "/www/wwwroot/101.200.130.1/ccc/";
const localDir = path.resolve(__dirname, "./.next");

const spinner = ora("连接服务器中...");
spinner.start();
let uploadCount = 0;
const totalCount = getFilesPaths(localDir);

ssh
  .connect({
    ...deployeConfig,
  })
  .then(() => {
    setTimeout(() => {
      spinner.succeed("服务器连接成功");
      const uploadOra = ora(`正在上传文件 ${uploadCount}/${totalCount}`);
      if (!fs.existsSync(localDir)) {
        console.log(chalk.red(`[ ERROR ] path: ${localDir} not found`));
        process.exit();
      }
      uploadOra.start();
      ssh
        .putDirectory(localDir, remoteDir, {
          recursive: true,
          tick: function (localPath, remotePath, error) {
            if (!error) {
              uploadCount++;
              uploadOra.text = `正在上传文件 ${uploadCount}/${totalCount}`;
            } else {
              // TODO: retry
            }
          },
        })
        .then(() => {
          uploadOra.succeed("上传成功");
          console.log(chalk.white("🤖️ 开始执行部署脚本"));
          ssh.execCommand("sh restart.sh").then(() => {
            console.log(chalk.white("🌲 部署成功"));
            process.exit();
          });
        });
    }, 1000);
  })
  .catch((error) => {
    spinner.stop();
    console.log(chalk.red(`服务器连接失败: ErrorMessage: ${error.message}`));
    process.exit();
  });

// 把改目录下的所有文件路径都获取出来
function getFilesPaths(dirPath) {
  let totalCount = 0;
  async function bfs(path) {
    const dir = fs.readdirSync(path, {
      withFileTypes: true,
    });
    dir.forEach((file) => {
      const childrenFilePath = `${path}/${file.name}`;
      if (!file.isDirectory()) {
        totalCount++;
      } else {
        bfs(childrenFilePath);
      }
    });
  }
  bfs(dirPath);
  return totalCount;
}

/**
 * Todo List
 * 1. Error Retry
 * 2. Breakpoint Trasfer
 */