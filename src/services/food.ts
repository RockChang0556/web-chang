/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-10 15:19:20
 * @Description: 菜品相关接口
 */
import _axios, { get, post } from '@/utils/axios';
import { objProp } from '@/types/types';

export default class Food {
	/**
	 * 添加菜品
	 */
	static async addFood(params: { [key: string]: any }) {
		const { data } = await post('/chang/food/add', params);
		return data;
	}
	/**
	 * 获取登陆用户创建的菜品
	 */
	static async getMyFoods(params: { [key: string]: any }) {
		const { data } = await post('/chang/food/list', params);
		return data;
	}
	/**
	 * 获取菜品详情
	 */
	static async getFoodDetail(path: objProp) {
		const { data } = await get(`/chang/food/${path.foodid}`);
		return data;
	}
}
