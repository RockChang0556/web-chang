/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2021-12-30 12:00:00
 * @Description: 用户相关接口
 */
// @ts-ignore
import _axios, { get } from '@/utils/axios';
import store from '@/store';

export default class User {
	/**
	 * 获取当前用户信息，并返回User实例
	 */
	static async getCurrentUser() {
		const { data } = await get('/user/current');
		const storeUser = store.getters.user === null ? {} : store.getters.user;
		return Object.assign({ ...storeUser }, data);
	}
}
