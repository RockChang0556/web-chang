import { createApp } from 'vue';
import AppWrap from './AppWrap.vue';
import router from './router';
import store from './store';

const app = createApp(AppWrap);
app.use(router).use(store).mount('#app');
