const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common')
const Terser = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    usedExports: true,
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new Terser({
        extractComments: false
      }),
      new CssMinimizerWebpackPlugin()
    ]
    // splitChunks: {
    //   chunks: 'all', // 支持同步/异步导入的模块，有三个值：initial（同步）、async （异步）、all（所有）
    //   minSize: 20000, // 生成 chunk 最小体积，单位字节
    //   minChunks: 1, // 这个模块至少被导入一次就分包
    //   cacheGroups: {
    //     // 分组一：针对第三方依赖，会继承前面的配置
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10, // 当同时匹配到两个分组时设置的优先级，值越大优先级越大
    //       filename: 'js/chunk-vendors.[fullhash:8].js',
    //     },
    //     // 分组一：针对公共模块，会继承前面的配置
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       filename: 'js/[name]-common.[fullhash:8].js',
    //     },
    //   }, // 提取 chunk 分组
    // },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash:6].css'
    }),
    // new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 8081 })
  ]
})
