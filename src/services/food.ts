/*
 * @Author: Rock Chang
 * @Date: 2021-08-09 23:06:34
 * @LastEditTime: 2022-01-25 18:46:07
 * @Description: 菜品相关接口
 */
import _axios, { get, post, put } from '@/utils/axios';
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
	/**
	 * 获取多个随机菜品
	 */
	static async getRandomFoods(params: objProp) {
		const { data } = await get(`/chang/food/random`, params);
		return data;
	}
	/**
	 * 点赞/取消点赞 菜品
	 */
	static async updateFoodLikes(path: objProp, params: objProp) {
		const { data } = await put(`/chang/food/${path.foodid}/likes`, params);
		return data;
	}
	/**
	 * 获取当前用户对当前菜品点赞信息
	 */
	static async getFoodLikes(path: objProp) {
		const { data } = await get(`/chang/food/${path.foodid}/likes`);
		return data;
	}
}
