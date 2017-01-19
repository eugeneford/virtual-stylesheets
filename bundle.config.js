var objectAssign = require("object-assign");
var config = require("./webpack.config");

module.exports = objectAssign({}, config, {
  entry: "./src/virtual-stylesheets.es6",
  output: {
    filename: "./dist/virtual-stylesheets.js",
    libraryTarget: 'umd',
    library: 'VSM'
  }
});