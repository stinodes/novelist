const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.argv.indexOf('-p') !== -1;
const nodeEnv = isProd ? 'production' : 'development';

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    inject: 'body'
  }),
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: sourcePath,
  entry: {
    js: './index.js',
    vendor: ['react']
  },
  output: {
    path: staticsPath,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /\.gif$|\.jpg$|\.jpeg$|\.png$|\.otf$|\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$|\.pdf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'name=src/[name]-[md5:hash].[ext]'
          }
        },

      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {
            name: '[name].[ext]'
          }
        },
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  plugins,
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0',
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
    },
  }
};