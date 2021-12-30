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
		getCurrentUser();

		return {
			loading,
		};
	},
});
</script>

<style lang="less">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-emphasis: none;
	text-decoration: none;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: #f2f2f2;
	width: 100%;
	min-height: 100vh;
	.component-fade-enter-active,
	.component-fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.component-fade-enter-from,
	.component-fade-leave-to {
		opacity: 0;
	}
}
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
