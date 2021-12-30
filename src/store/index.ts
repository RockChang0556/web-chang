/*
 * @Author: Rock Chang
 * @Date: 2021-08-05 15:11:25
 * @LastEditTime: 2021-12-30 11:34:53
 * @Description:
 */
import { createStore, createLogger } from 'vuex';
import user from './modules/user';

const debug = import.meta.env.MODE !== 'production';

const store = createStore({
	modules: {
		user,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
});

export default store;
