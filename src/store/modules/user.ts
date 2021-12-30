/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 15:11:25
 * @LastEditTime: 2021-12-30 18:14:19
 * @Description:
 */
import { UserApi } from '@/services';
import { removeToken } from '@/utils/token';

export interface UserProps {
	id?: number;
	name?: string;
	phone?: string;
	admin?: '0' | '1' | '2' | '3' | '4' | '5';
	email?: string;
	avatar_url?: string;
	position?: string;
	sex?: 1 | 0 | -1;
	summary?: string;
	isFetched: boolean;
}
export type themeProp = 'light' | 'dark' | 'auto';

interface StateProps {
	lang: string;
	userInfo: UserProps;
	theme: themeProp;
}
// initial state
const state: StateProps = {
	lang: 'zh',
	userInfo: {
		isFetched: false,
	},
	theme: 'light',
};

// getters
const getters = {};

// actions
const actions = {
	logout({ commit }: any) {
		commit('setUserInfo', { isFetched: true });
		removeToken();
	},
	async getUserInfo({ commit }: any) {
		const userInfo = await UserApi.getCurrentUser();
		if (userInfo && userInfo.code === 0 && userInfo.data.id) {
			commit('setUserInfo', { ...userInfo.data, isFetched: true });
		}
	},
};

// mutations
const mutations = {
	setUserInfo(state: StateProps, userInfo: UserProps) {
		state.userInfo = userInfo;
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
	},
	setLang(state: StateProps, lang: string) {
		state.lang = lang;
		localStorage.setItem('lang', lang);
	},
	setTheme(state: StateProps, theme: themeProp) {
		state.theme = theme;
		localStorage.setItem('theme', theme);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
