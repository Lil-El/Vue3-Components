import App from "./app.vue"; // 需要在tsconfig中配置
import { createApp } from "vue";
import V3Component from "src";

const app = createApp(App);

app.use(V3Component);
app.mount("#app");
