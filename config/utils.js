const path = require('path')

// 工作目录
const WORK_PATH = process.cwd()

// 解析路径
function resolvePath(target) {
  return path.join(WORK_PATH, target)
}

module.exports = {
  SRC_PATH: resolvePath('src'),
  OUTPUT_PATH: resolvePath('dist'),
  PUBLIC_PATH: resolvePath('public'),
  WORK_PATH,
  resolvePath
}
