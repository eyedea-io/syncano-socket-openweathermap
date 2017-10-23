var webpack = require('webpack')
var {join, resolve} = require('path')
var fs = require('fs')
var yaml = require('js-yaml')

// const configPath = join(__dirname, `socket.yml`);
// const config = yaml.load(fs.readFileSync(configPath, 'utf8')) || {};

process.env.NODE_ENV = 'production'

module.exports = {
  // entry: Object.keys(config.components).reduce((all, item) => {
  //   return Object.assign(all, {
  //     [item]: resolve(__dirname, 'src/components', config.components[item].file)
  //   })
  // }, {}),
  entry: './src/components/index.js',
  output: {
    libraryTarget: 'commonjs2',
    path: resolve(__dirname, '.components'),
    filename: 'index.js',
  },
  // output: {
  //   libraryTarget: 'commonjs2',
  //   path: resolve(__dirname, '.components'),
  //   filename: '[name].js',
  //   publicPath: '/',
  // },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: join(__dirname, 'src/components'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      }
    ]
  }
}
