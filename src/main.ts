import { createApp } from "vue";
import App from "./App.vue";
import VueLazyLoad from "vue3-lazyload";
import mitt, { EventType, Emitter } from "mitt";
const emitter: Emitter<Record<EventType, unknown>> = mitt();
//const emitter: Emitter<any> = mitt<any>();
import router from "./router";
import store from "./store";
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(store).use(router).use(VueLazyLoad).mount("#app");
