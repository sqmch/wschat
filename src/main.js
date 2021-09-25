//import Vue from "vue";
import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router";
import store from './store'

//createApp(App).use(Quasar, quasarUserOptions, router).mount("#app");
const app = createApp(App).use(store);
app.use(Quasar);
app.use(quasarUserOptions);
app.use(router);
app.mount("#app");
