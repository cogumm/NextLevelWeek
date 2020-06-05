module.exports = function override(config, env) {
  config.resolve.alias["react-native-svg"] = "react-native-svg-web";
  return config;
};
