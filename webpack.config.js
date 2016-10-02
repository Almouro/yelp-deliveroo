module.exports = {
  entry: {
    deliveroo: './src/deliveroo.jsx',
  },
  output: {
    path: '.',
    filename: 'extension/index.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&minetype=image/png' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: '.',
    port: '3001',
  },
};
