<template>
	<router-view>
		<template #default="{ Component, route }">
			<AppProvider>
				<keep-alive v-if="route.meta && route.meta.keepAlive">
					<component :is="Component" />
				</keep-alive>
				<component :is="Component" v-else />
			</AppProvider>
		</template>
	</router-view>
</template>

<script lang="ts" setup name="App">
import { onMounted } from 'vue';
import { getLocStorage } from '@/utils/token';
import { useUserStore } from '@/store';
import AppProvider from '@/components/layout/app-provider/index.vue';

const userStore = useUserStore();

// 初始化主题
const initTheme = () => {
	const theme = getLocStorage('theme');
	if (theme) {
		userStore.setTheme(theme);
	}
};

onMounted(() => {
	initTheme();
});
</script>

<style lang="less">
@import url('@/assets/css/naive.less');
@import url('@/assets/css/common.less');
html {
	color: var(--n-text-color);
}
#app {
	height: 100%;
	.n-config-provider {
		height: inherit;
	}
}
</style>
