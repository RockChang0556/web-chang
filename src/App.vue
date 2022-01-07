<template>
	<router-view v-slot="{ Component }">
		<transition name="component-fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { getToken } from '@/utils/token';
import { useMessage } from 'naive-ui';

export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		const store = useStore();
		const loading = ref(false);
		// 初始化 naive-ui useMessage
		window.$message = useMessage();

		// 获取用户信息
		const getCurrentUser = async () => {
			const access_token = getToken('access_token');
			if (access_token) {
				try {
					loading.value = true;
					await store.dispatch('user/getUserInfo');
				} catch (err) {
					store.commit('user/setUserInfo', { isFetched: true });
				} finally {
					loading.value = false;
				}
			} else {
				store.commit('user/setUserInfo', { isFetched: true });
			}
		};

		// 初始化主题
		const initTheme = () => {
			const theme = getToken('theme');
			if (theme) {
				store.commit('user/setTheme', theme);
			}
		};

		const created = () => {
			getCurrentUser();
			initTheme();
		};
		created();
		return {
			loading,
		};
	},
});
</script>

<style lang="less">
@import url('@/assets/css/common.less');
</style>
