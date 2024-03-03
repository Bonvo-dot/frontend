const webpack = require("webpack");

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  webpackConfig.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: false,
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer"),
    os: require.resolve("os-browserify/browser"),
    url: false,
    tty: false,
    assert: false,
    fs: false,
    process: false,
  };

  webpackConfig.plugins = [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    ...webpackConfig.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return webpackConfig;
};
