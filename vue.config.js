const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: "http://120.79.67.139:8082/mock/5e92db0528cfad5ddec49123/prodTrace"
  }
};
