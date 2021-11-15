const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, DllReferencePlugin } = require('webpack')
const { OUTPUT_PATH, PUBLIC_PATH, resolvePath, WORK_PATH } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    main: './src/main.ts'
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
      BASE_URL: JSON.stringify('')
    }),
    new DllReferencePlugin({
      context: WORK_PATH,
      manifest: resolvePath('dll/lodash.manifest.json')
    }),
    new AddAssetHtmlPlugin({
      outputPath: 'auto',
      filepath: resolvePath('dll/dll_lodash.js')
    })
  ]
  // externals: {
  //   'lodash-es': '_',
  // },
}
