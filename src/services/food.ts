/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-07 15:30:52
 * @Description: 菜品相关接口
 */
// @ts-ignore
import _axios, { post } from '@/utils/axios';

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
}
