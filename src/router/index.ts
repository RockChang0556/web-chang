import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home-wrap',
		component: () => import('@/views/home-wrap.vue'),
		redirect: { name: 'home' },
		children: [
			{
				path: '/',
				name: 'home',
				component: () => import('@/views/myhome/index.vue'),
			},
			{
				path: '/mywish',
				name: 'mywish',
				component: () => import('@/views/mywish/index.vue'),
			},
			{
				path: '/mywish/add',
				name: 'addwish',
				component: () => import('@/views/mywish/addwish.vue'),
			},
		],
	},
	{
		path: '/eat',
		name: 'eat',
		component: () => import('@/views/eat/index.vue'),
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
});

export default router;
