const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[chunkhash]";

module.exports = merge(commonConfig({ outputFile, assetFile }), {
  mode: "production",
  devServer: {
    static: {
      directory: "public",
    },
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssPlugin()],
  },
});