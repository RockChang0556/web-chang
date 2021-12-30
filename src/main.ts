import { createApp } from 'vue';
import AppWrap from './AppWrap.vue';
import router from './router';
import store from './store';
import Rui from '@/components/global'; // 自定义全局组件

// 按需全局安装组件
import {
	// create naive ui
	create,
	// component
	NButton,
} from 'naive-ui';
const naive = create({
	components: [NButton],
});
const app = createApp(AppWrap);
app.use(Rui).use(naive);
app.use(router).use(store).mount('#app');
