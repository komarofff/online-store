import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
const emitter = mitt();
import router from "./router";
import store from "./store";
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(store).use(router).mount("#app");
