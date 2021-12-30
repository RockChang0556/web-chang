/*
 * @Author: Rock Chang
 * @Date: 2021-08-14 10:58:55
 * @LastEditTime: 2021-12-30 16:54:00
 * @Description: 常量
 */
// 默认头像
export const avatarDefaultUrl =
	'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
// 登陆url,登陆后重定向到原始页面
export const loginUrl = `/login?redirect_uri=${location.href}`;
export const logoutUrl = `/login?logout=1`;
export const homeUrl = `/`;
