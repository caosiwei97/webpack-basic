const { resolvePath, WORK_PATH } = require('./utils')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    lodash: ['lodash-es', 'lodash']
  },
  output: {
    path: resolvePath('dll'),
    filename: 'dll_[name].js',
    library: 'dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'dll_[name]', // 设置成 library 的值
      path: resolvePath('dll/[name].manifest.json')
    })
  ]
}
