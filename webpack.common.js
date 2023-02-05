const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = ({ outputFile, assetFile }) => ({
  entry: path.resolve(__dirname, "src", "js", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `${outputFile}.js`,
    assetModuleFilename: `images/${assetFile}[ext]`,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new webpack.ProvidePlugin({
      THREE: 'three/build/three'
    }),
    // new webpack.ProvidePlugin({
    //   OrbitControls: "three/examples/jsm/controls/OrbitControls.js"
    // }),
  ],
});
