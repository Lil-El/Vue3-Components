import App from "./app.vue"; // 需要在tsconfig中配置
import { createApp } from "vue";

const app = createApp(App);
app.mount("#app");
