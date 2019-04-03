const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    //libraryTarget: 'commonjs2' /* use this and (externals: ['react', 'commonjs2']) if you are building a component for npm.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /^((?!node_modules).)*global\.js$/,
        //test: /global\.js$/,
        exclude: /node_modules/,
        use: [ 'script-loader' ]
      },
    ]
  },
  plugins: [
    new ManifestPlugin()
  ],
  externals: {
  }
};
