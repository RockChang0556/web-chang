/*
 * @Author: Rock Chang
 * @Date: 2022-01-22 19:54:04
 * @LastEditTime: 2022-01-22 21:06:58
 * @Description:
 */

import { defineStore } from 'pinia';
import { UserApi } from '@/services';
import { removeToken } from '@/utils/token';
import { UserProps, themeProp } from '@/types/types';

interface StateProps {
	lang?: string;
	userInfo: UserProps;
	theme: themeProp;
}
export const useUserStore = defineStore({
	id: 'user',
	state: () => {
		const state: StateProps = {
			theme: 'light',
			userInfo: {
				isFetched: false,
			},
		};
		return state;
	},
	actions: {
		setTheme(theme: themeProp) {
			this.theme = theme;
			// localStorage.setItem('theme2', theme);
		},
		setUserInfo(userInfo: UserProps) {
			this.userInfo = userInfo;
			// localStorage.setItem('userInfo', JSON.stringify(userInfo));
		},
		async getUserInfo() {
			const userInfo = await UserApi.getCurrentUser();
			if (userInfo && userInfo.code === 0 && userInfo.data.id) {
				this.setUserInfo({ ...userInfo.data, isFetched: true });
			}
		},
		// 退出登录
		logout() {
			this.setUserInfo({ isFetched: true });
			removeToken();
		},
	},
	// 开启数据缓存
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				// paths: ['theme', 'userInfo'],
			},
		],
	},
});
