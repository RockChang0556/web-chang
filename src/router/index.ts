/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 11:34:59
 * @LastEditTime: 2022-01-24 11:32:35
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router';
import { loginUrl, BASE_URL } from '@/constants';
import routes from './routes';
import { useUserStore } from '@/store';

const router = createRouter({
	history: createWebHistory(BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const hasToken = localStorage.getItem('access_token');
	// 登录验证
	if (isLoginRequired(to.meta) && !hasToken) {
		window.$message.error('此页面需要登录, 即将为您跳转登录页面');
		setTimeout(() => {
			location.href = loginUrl;
		}, 1500);
		return;
	}
	// 权限验证, -1-未登录 0-登录 1~5管理员
	const { userInfo } = useUserStore();
	const userAdmin: number = userInfo.admin ?? -1;
	const pageAdmin: number = (to.meta.admin as number) ?? -1;
	if (pageAdmin > userAdmin) {
		next({ name: '403' });
		return;
	}

	// 路由发生变化修改页面title
	if (to.meta.title) {
		document.title = `${to.meta.title} | 鹏`;
	}

	next();
});

function isLoginRequired(meta: any) {
	return meta.admin >= 0;
}

export default router;
