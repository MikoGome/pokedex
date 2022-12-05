const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve('src', 'index.tsx'),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.[contentHash].js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src', 'index.html')
    })  
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g)$/,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
         target: 'http://server:3000',
         secure: false
      }
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'assets': path.resolve('client', 'assets')
    }
  },
  watchOptions: {
    poll: 1000
  }
}