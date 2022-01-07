/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-07 17:10:39
 * @Description: 心愿单相关接口
 */
// @ts-ignore
import { pqoParamsProp } from '@/types/types';
import _axios, { post, put, _delete } from '@/utils/axios';

export default class Wish {
	/**
	 * 添加心愿单
	 */
	static async addWish(params: { [key: string]: any }) {
		const { data } = await post('/chang/wish/add', params);
		return data;
	}
	/**
	 * 获取登陆用户名下心愿单
	 */
	static async getMyWishs(params: pqoParamsProp = {}) {
		const { data } = await post('/chang/wish/list', params);
		return data;
	}
	/**
	 * 删除心愿单
	 */
	static async deleteWish(params: { [key: string]: any }) {
		const { data } = await _delete('/chang/wish/:id', params);
		return data;
	}
	/**
	 * 更新心愿单
	 */
	static async updateWish(params: { [key: string]: any }) {
		const { data } = await put('/chang/wish/:id', params);
		return data;
	}
}
