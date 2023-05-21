// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Paths
const buildFolder = "/dist";
const srcFolder = "./src";
const path = {
  src: {
    scripts: `${srcFolder}/js/index.js`,
    html: `${srcFolder}/index.html`,
    styles: `${buildFolder}/scss/style.scss`,
  },
  build: {
    scripts: `${buildFolder}/js/`,
    styles: `${buildFolder}/css/`,
  },
};

module.exports = {
  entry: path.src.scripts,
  output: {
    path: __dirname + buildFolder,
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "none",
};
