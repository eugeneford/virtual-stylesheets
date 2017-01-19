var objectAssign = require("object-assign");
var config = require("./webpack.config");

module.exports = objectAssign({}, config, {
  entry: "./test/js/suite.es6",
  output: {
    filename: "./test/build/suite.js"
  }
});