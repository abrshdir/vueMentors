import { createApp } from 'vue';

import store from "./store/store";
import router from './router.js';
import App from './App.vue';
import BaseCard from "./components/UI/BaseCard";
import BaseButton from "./components/UI/BaseButton";
import BaseBadge from "./components/UI/BaseBadge";
import BaseSpinner from "./components/UI/BaseSpinner";
import BaseDialog from "./components/UI/BaseDialog";

const app = createApp(App)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)
app.use(router);
app.use(store);
app.mount('#app');
