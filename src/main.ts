import { createApp } from 'vue';
import AppWrap from './AppWrap.vue';
import router from './router';
import store from './store';
import Rui from '@/components/global'; // 自定义全局组件

const app = createApp(AppWrap);

// 按需全局安装naive组件
import {
	// create naive ui
	create,
	// component
	NButton,
	NInput,
	NSpin,
	NTooltip,
	NEmpty,
	NImage,
} from 'naive-ui';
const naive = create({
	components: [NButton, NInput, NSpin, NTooltip, NEmpty, NImage],
});
app.use(naive);

// 自定义全局组件
app.use(Rui);

// 路由
app.use(router);

// 状态管理 - pinia
app.use(store);

app.mount('#app');
