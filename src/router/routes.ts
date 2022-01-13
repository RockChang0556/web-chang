import { RouteRecordRaw } from 'vue-router';

const errRoute: Array<RouteRecordRaw> = [
	{
		path: '/err',
		name: 'err',
		component: () => import('@/components/errpage/index.vue'),
		children: [
			{
				path: '403',
				name: '403',
				component: () => import('@/components/errpage/403.vue'),
			},
			{
				path: '404',
				name: '404',
				component: () => import('@/components/errpage/404.vue'),
			},
		],
	},
];
const wishRoute: Array<RouteRecordRaw> = [
	{
		path: '/mywish',
		name: 'mywish',
		component: () => import('@/views/mywish/index.vue'),
		meta: { admin: 0 },
	},
	{
		path: '/mywish/add',
		name: 'addwish',
		component: () => import('@/views/mywish/wish-detail.vue'),
		meta: { admin: 0 },
	},
	{
		path: '/mywish/edit/:wishid',
		name: 'editwish',
		props: true,
		component: () => import('@/views/mywish/wish-detail.vue'),
		meta: { admin: 0 },
	},
];
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
			...wishRoute,
			...errRoute,
		],
	},
	{
		path: '/eat',
		name: 'eat',
		component: () => import('@/views/eat/index.vue'),
	},

	{
		path: '/:pathMatch(.*)',
		redirect: '/err/404',
	},
];

export default routes;