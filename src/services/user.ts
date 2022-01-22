/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-22 21:07:24
 * @Description: 用户相关接口
 */
// @ts-ignore
import _axios, { get } from '@/utils/axios';

export default class User {
	/**
	 * 获取当前用户信息，并返回User实例
	 */
	static async getCurrentUser() {
		const { data } = await get('/user/current');
		return data;
	}
}
