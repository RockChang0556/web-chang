/*
 * @Author: Rock Chang
 * @Date: 2021-08-14 10:58:55
 * @LastEditTime: 2022-02-25 17:54:29
 * @Description: 常量
 */

// 环境变量
// API接口 baseUR, 在根目录.env文件查找对应环境变量配置
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_API = import.meta.env.VITE_BASE_API;

// 登陆url,登陆后重定向到原始页面
export const loginUrl = `/login?redirect_uri=${location.href}`;
export const logoutUrl = `/login?logout=1`;
export const homeUrl = `/`;
export const userInfoUrl = `/user/settings`;

// 默认头像
export const avatarDefaultUrl =
	'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
// 默认图片
export const imgDefaultUrl =
	'https://s2.loli.net/2022/02/25/CI4zVXj6shSYRtl.png';
// 默认美食图片
export const imgFoodUrl = 'https://s2.loli.net/2022/02/25/lvqNVzH5nfpB9DW.png';
export const img404Url = 'https://s2.loli.net/2022/02/25/QcTpFM9XIglwN3k.png';
export const img403Url = 'https://s2.loli.net/2022/02/25/p2umSl8cygeB1JW.png';
