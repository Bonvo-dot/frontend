const webpack = require("webpack");

// tuve que hacer todo esto siguiendo los pasos que puso el pibe aca:
//stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
https: module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  const fallback = webpackConfig.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    fs: false,
    path: require.resolve("path-browserify"),
  });
  webpackConfig.resolve.fallback = fallback;
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  webpackConfig.ignoreWarnings = [/Failed to parse source map/];

  return webpackConfig;
};
