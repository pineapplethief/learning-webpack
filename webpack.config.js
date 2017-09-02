require('dotenv').config()

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const commonConfig = {
  entry: {
    app: PATHS.app
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo'
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}

const productionConfig = () => commonConfig

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,

      stats: 'errors-only',
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || '3000',

      overlay: {
        errors: true,
        warnings: true,
      },
    },

    plugins: [
      ...commonConfig.plugins
    ]
  }

  return Object.assign({}, commonConfig, config)
}

module.exports = (env) => {
  console.log('env', env)

  if (env === 'production') {
    return productionConfig()
  }

  return developmentConfig()
}
