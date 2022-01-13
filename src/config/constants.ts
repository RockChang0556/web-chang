/*
 * @Author: Rock Chang
 * @Date: 2021-08-14 10:58:55
 * @LastEditTime: 2022-01-13 18:57:00
 * @Description: 常量
 */

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
	'https://iconfont.alicdn.com/t/39d6ab66-8b04-4e9a-8be3-9ec3cf92490e.png';
// 默认美食图片
export const imgFoodUrl =
	'https://iconfont.alicdn.com/t/2a902e59-cdc0-4317-8711-f4ad2119c087.png';
// 美食不存在图片
export const imgFood404Url =
	'https://iconfont.alicdn.com/t/ababd71e-53df-4be2-a7e2-0f8d9b1048c6.png';
export const img404Url =
	'https://iconfont.alicdn.com/t/3466853c-864b-4a6e-bb6d-82d3059a1eb6.png';
export const img403Url =
	'https://iconfont.alicdn.com/t/d25eb3e0-1940-404c-95fa-9c37fc531692.png';
