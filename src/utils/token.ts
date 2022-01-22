/**
 * 存储tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function saveTokens(accessToken: string, refreshToken: string) {
	localStorage.setItem('access_token', `Bearer ${accessToken}`);
	localStorage.setItem('refresh_token', `Bearer ${refreshToken}`);
}

/**
 * 移除token
 */
export function removeToken() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
}

/**
 * 获得某个localStorage
 * @param {string} key
 * @param {unknown} defVal
 */
export function getLocStorage(key: string, defVal?: unknown) {
	let val: any = localStorage.getItem(key) || '';
	if (!val) return defVal;
	if (val?.indexOf('{') > -1 || val?.indexOf('[') > -1) {
		try {
			val = JSON.parse(val);
		} catch (error) {
			val = defVal;
		}
	}
	return val;
}
