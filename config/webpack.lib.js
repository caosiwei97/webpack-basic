const { resolvePath } = require('./utils')
module.exports = {
  mode: 'production',
  entry: './src/js/utils.ts',
  output: {
    filename: 'utils.js',
    path: resolvePath('lib'),
    libraryTarget: 'umd',
    library: 'utils',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
}
