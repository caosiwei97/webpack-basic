module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false
      }
    ],
    [
      '@babel/preset-typescript',
      {
        allExtensions: true // 支持所有文件扩展名
      }
    ]
  ]
}
