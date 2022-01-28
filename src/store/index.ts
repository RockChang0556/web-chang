/*
 * @Author: Rock Chang
 * @Date: 2022-01-22 19:47:59
 * @LastEditTime: 2022-01-28 12:23:21
 * @Description: 全局状态管理 - pinia
 */

import { createPinia } from 'pinia';
// 持久化 state
import piniaPluginPersist from 'pinia-plugin-persist';
import { useUserStore } from './user';

const store = createPinia();
/* 
  插件
*/
store.use(piniaPluginPersist); // 持久化

export default store;
export { useUserStore };
