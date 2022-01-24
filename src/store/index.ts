/*
 * @Author: Rock Chang
 * @Date: 2022-01-22 19:47:59
 * @LastEditTime: 2022-01-24 14:15:37
 * @Description: 全局状态管理 - pinia
 */

import { createPinia } from 'pinia';
// 持久化 state
import piniaPluginPersist from 'pinia-plugin-persist';
import { useUserStore } from './user';

const store = createPinia();
store.use(piniaPluginPersist);
export default store;

export { useUserStore };
