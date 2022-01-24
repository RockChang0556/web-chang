<template>
	<router-view v-slot="{ Component }">
		<transition name="component-fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script lang="ts" setup name="App">
import { ref } from 'vue';
import { getLocStorage } from '@/utils/token';
import { useMessage } from 'naive-ui';
import { useUserStore } from '@/store';
const userStore = useUserStore();

const loading = ref(false);
// 获取用户信息
const getCurrentUser = async () => {
	const access_token = getLocStorage('access_token');
	if (access_token) {
		try {
			loading.value = true;
			await userStore.getUserInfo();
		} catch (err) {
			userStore.setUserInfo({ isFetched: true });
		} finally {
			loading.value = false;
		}
	} else {
		userStore.setUserInfo({ isFetched: true });
	}
};

// 初始化主题
const initTheme = () => {
	const theme = getLocStorage('theme');
	if (theme) {
		userStore.setTheme(theme);
	}
};

const created = () => {
	// 初始化 naive-ui useMessage
	window.$message = useMessage();
	getCurrentUser();
	initTheme();
};
created();
</script>

<style lang="less">
@import url('@/assets/css/common.less');
</style>
