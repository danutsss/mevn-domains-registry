import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index";
import { VueCookies } from "vue-cookies";

/* import bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.mount("#app");
