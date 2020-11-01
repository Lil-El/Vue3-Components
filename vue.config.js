const path = require("path");
const resolve = (filePath) => path.join(__dirname, "./", filePath);

module.exports = {
  outputDir: "docs",
  publicPath: "/v3-components/",
  devServer: { port: 3355 },
  pages: {
    index: {
      entry: resolve("story/main.ts"),
      template: "public/index.html",
      filename: "index.html",
      title: "v3-components",
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch-index").delete("preload-index");
    config.resolve.alias.set("story", resolve("story"));
  },
};
