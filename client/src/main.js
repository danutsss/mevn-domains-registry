import { createApp } from "vue";
import { createPinia } from "pinia";
import Particles from "particles.vue3";

import App from "./App.vue";
import router from "./router";

import "@/assets/css/main.css";

const app = createApp(App).use(Particles);

app.use(createPinia());
app.use(router);
app.mount("#app");
