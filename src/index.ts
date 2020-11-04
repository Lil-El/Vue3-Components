import { App } from "vue";
// 不使用@，在使用组件库时，用户会配置@，导致无法找到正确路径
// 使用相对路径
import Input from "./package/input";
// import Button from "./package/button";

const plugins = [Input];

function install(app: App) {
  plugins.forEach(app.use);
}

export default {
  install,
};

export { Input, install };
