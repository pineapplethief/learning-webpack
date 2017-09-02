require('dotenv').config()

const path = require('path')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const configParts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app
    },

    output: {
      path: PATHS.build,
      filename: '[name].js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Demo'
      }),
      new FriendlyErrorsWebpackPlugin()
    ],
  },
  configParts.lintJavascript({ include: PATHS.app })
])

const productionConfig = merge([])

const developmentConfig = merge([
  configParts.devServer({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '3000',
  }),
])

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig)
  }

  return merge(commonConfig, developmentConfig)
}
