import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/new',
	},
	{
		path: '/new/:templateKey?',
		props: true,
		name: 'new',
		component: () => import('@/views/designer/designer.vue'),
	},
	{
		path: '/edit/:formKey',
		props: true,
		name: 'edit',
		component: () => import('@/views/designer/designer.vue'),
	},
	{
		path: '/publish/:formKey',
		props: true,
		name: 'publish',
		component: () => import('@/views/publish/publish.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import('@/components/layout/404.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.VUE_APP_DESIGNER_PATH),
	routes,
})

export default router
