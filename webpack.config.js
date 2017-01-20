path = require("path");

module.exports = {
  entry: "./src/virtual-stylesheets.es6",
  output: {
    filename: "./dist/virtual-stylesheets.js",
    libraryTarget: 'umd',
    library: 'VSM',
    auxiliaryComment: "istanbul ignore next"
  },

  module: {
    loaders: [{
      test: /\.es6$/,
      include: [
        path.resolve(__dirname, "src/"),
        path.resolve(__dirname, "test/js/")
      ],
      loader: 'babel-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }
};