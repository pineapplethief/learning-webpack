exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    host,
    port,

    historyApiFallback: true,
    stats: 'errors-only',
    overlay: {
      warnings: true,
      errors: true
    }
  }
})

exports.lintJavascript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
})
