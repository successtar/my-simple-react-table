const path = require('path')
const pkg = require('./package.json')
const libraryName = pkg.name

module.exports = {
  target: 'web',
  mode: 'production',
  optimization: {
    minimize: false
  },
  entry: './src/index.js',
  output: {
    path: path.resolve('./lib'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    publicPath: '/lib/',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        type: 'javascript/auto',
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  }
}