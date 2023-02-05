const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = merge(commonConfig({ outputFile, assetFile }), {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: "./public",
    },
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
  ],
});