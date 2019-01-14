exports.onClientEntry = () => {
  require("babel-polyfill");
  require("./src/utils/modernizr");
};
