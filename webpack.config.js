path = require("path");

module.exports = {
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