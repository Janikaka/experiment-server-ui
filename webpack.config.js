module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/index.jsx",
    css: "./src/main.css",
    html: "./src/index.html"
  },
  output: {
    path: __dirname + "/static",
    publicPath: '/',
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"}
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "file?name=[name].[ext]", exclude: /flexboxgrid/},
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot","babel-loader"]},
      { test: /\.css$/, loader: 'style!css?modules', include: /flexboxgrid/},
      { test: /\.json$/, loader: "json-loader" }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.webpack.js', '.web.js']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './static',
    port: process.env.PORT || 8080
  }
};
