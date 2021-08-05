import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/home.vue'),
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
