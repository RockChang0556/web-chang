/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-14 19:49:50
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
	 * 获取登陆用户名下心愿单
	 */
	static async getMyWishs(datas: pqoParamsProp = {}) {
		const { data } = await post('/chang/wish/list', datas);
		return data;
	}

	/**
	 * 获取心愿单基本信息
	 */
	static async getWishBase(path: objProp) {
		const { data } = await get(`/chang/wish/${path.wishid}/base`);
		return data;
	}

	/**
	 * 更新心愿单基本信息
	 */
	static async updateWishBase(path: objProp, datas: objProp) {
		const { data } = await put(`/chang/wish/${path.wishid}/base`, datas);
		return data;
	}

	/**
	 * 获取心愿单下菜品
	 */
	static async getWishFoods(path: objProp) {
		const { data } = await get(`/chang/wish/${path.wishid}/food_list`);
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
