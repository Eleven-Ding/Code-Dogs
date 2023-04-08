const path = require("path");
const { NodeSSH } = require("node-ssh");
const deployeConfig = require("./deploy.config.ts");
const archiver = require("archiver");
const fs = require("fs");

const remoteDir = "/www/wwwroot/101.200.130.1/next/.next.zip";
const srcDir = path.resolve(__dirname, "./.next");
const ssh = new NodeSSH();

compression(srcDir, path.resolve(__dirname, "./.next")).then(() => {
  console.log(`文件压缩成功!: ./.next.zip`);
  console.log("开始连接服务器...");
  ssh
    .connect({
      ...deployeConfig,
    })
    .then(() => {
      console.log("服务器连接成功!");
      console.log("开始上传文件...");
      ssh.putFile(srcDir + ".zip", remoteDir).then((res) => {
        console.log("文件上传完毕!");
        console.log("正在部署...");
        startRemoteShell();
      });
    })
    .catch((error) => {
      console.log("ssh连接失败:", error);
      process.exit(0);
    });
});

//压缩
function compression(srcPath, outputPath) {
  console.log("开始压缩文件...");
  return new Promise((resolve, reject) => {
    var archive = archiver("zip", {
      zlib: { level: 9 }, //递归扫描最多5层
    }).on("error", function (error) {
      reject(error);
    });

    var output = fs
      .createWriteStream(outputPath + ".zip")
      .on("close", function (err) {
        /*压缩结束时会触发close事件，然后才能开始上传，
             否则会上传一个内容不全且无法使用的zip包*/
        if (err) {
          console.log("关闭archiver异常:", err);
          reject(`关闭archiver异常: ${error.message}`);
        }
        resolve();
      });

    archive.pipe(output);
    archive.directory(srcPath, "/.next"); //将srcPach路径对应的内容添加到zip包中/public路径
    archive.finalize();
  });
}

//执行远端部署脚本
function startRemoteShell() {
  //在服务器上cwd配置的路径下执行sh deploy.sh脚本来实现发布
  ssh
    .execCommand("sh deploy.sh", { cwd: "/www/wwwroot/101.200.130.1/next" })
    .then((result) => {
      if (!result.stderr) {
        console.log(result.stdout.split("[PM2]").pop());
        console.log("部署成功!");
        fs.rmSync(srcDir + ".zip");
        process.exit(0);
        // 删除压缩的 .next 文件
      }
    });
}
