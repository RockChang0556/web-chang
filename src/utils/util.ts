/*
 * @Author: Rock Chang
 * @Date: 2021-08-10 09:34:39
 * @LastEditTime: 2022-01-22 19:29:05
 * @Description: 工具类方法
 */

/**
 * @description: 根据 key 获取 url 中的值
 * @param {string} key
 * @param {string} url
 * @return {string}
 */
export const getQueryString = (key: string, url = location.search) => {
	const urlSP = new URLSearchParams(url);
	return urlSP.get(key);
};

/** 获取min-max之间的一个随机数
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const randomNum = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
