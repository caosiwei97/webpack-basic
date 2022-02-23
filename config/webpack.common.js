const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, DllReferencePlugin } = require('webpack')
const { OUTPUT_PATH, PUBLIC_PATH, resolvePath, WORK_PATH } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const { VueLoaderPlugin } = require('vue-loader')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  entry: {
    app: './src/entry-vue.ts'
  },
  output: {
    filename: 'js/[name].bundle.[fullhash:8].js',
    path: OUTPUT_PATH,
    chunkFilename: 'js/chunk-[name].[fullhash:8].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:4][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:4][ext]'
        }
      },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello webpack',
      template: path.join(PUBLIC_PATH, 'index.html')
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify(''),
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new DllReferencePlugin({
      context: WORK_PATH,
      manifest: resolvePath('dll/lodash.manifest.json')
    }),
    new AddAssetHtmlPlugin({
      outputPath: 'auto',
      filepath: resolvePath('dll/dll_lodash.js')
    }),
    new VueLoaderPlugin(),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
}
