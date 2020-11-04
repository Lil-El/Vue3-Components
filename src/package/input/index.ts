import { App } from "vue";
import Input from "./input";

export default {
  ...Input,
  install(app: App) {
    app.component(Input.name, Input);
  },
};
