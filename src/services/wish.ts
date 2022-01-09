/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-09 13:46:16
 * @Description: 心愿单相关接口
 */
// @ts-ignore
import { pqoParamsProp, objProp } from '@/types/types';
import _axios, { get, post, put, _delete } from '@/utils/axios';

export default class Wish {
	/**
	 * 添加心愿单
	 */
	static async addWish(datas: objProp) {
		const { data } = await post('/chang/wish/add', datas);
		return data;
	}

	/**
	 * 删除心愿单
	 */
	static async deleteWish(path: objProp) {
		const { data } = await _delete(`/chang/wish/${path.wishid}`);
		return data;
	}

	/**
	 * 更新心愿单
	 */
	static async updateWish(path: objProp, datas: objProp) {
		const { data } = await put(`/chang/wish/${path.wishid}`, datas);
		return data;
	}

	/**
	 * 获取登陆用户名下心愿单
	 */
	static async getMyWishs(datas: pqoParamsProp = {}) {
		const { data } = await post('/chang/wish/list', datas);
		return data;
	}

	/**
	 * 获取心愿单详情
	 */
	static async getWishDetail(path: objProp) {
		const { data } = await get(`/chang/wish/${path.wishid}`);
		return data;
	}

	/**
	 * 更新心愿单下菜品
	 */
	static async updateWishFoods(path: objProp, datas: objProp) {
		const { data } = await put(`/chang/wish/${path.wishid}/updatefood`, datas);
		return data;
	}
}
