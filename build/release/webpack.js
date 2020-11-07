const $utils = require("../build.utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: $utils.resolve("src/index.ts"),
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
    },
  },
  output: {
    filename: "[name].js",
    path: $utils.resolve("dest"),
    libraryTarget: "umd",
    /**
     * entry导出了{default:{install},install,Input,Button}
     * 1.
     * libraryExport = default;
     * V3ComponentsWsj = {install}
     * 2.
     * libraryExport = Input;
     * V3ComponentsWsj = Input;
     */
    // libraryExport: "default", // 配置library导出的内容，默认是入口导出的所有对象，也可选为自己的模块“Input”
    library: "V3ComponentsWsj",
    globalObject: "this",
  },
  plugins: [
    new $utils.webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
    alias: {
      "@": $utils.resolve("src"),
      src: $utils.resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              prependData: `@import "src/style/global-import.scss";`,
            },
          },
        ],
      },
    ],
  },
};
