<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
		<n-message-provider>
			<App />
		</n-message-provider>
	</n-config-provider>
</template>

<script lang="ts" setup name="AppWrap">
import { computed } from 'vue';
import App from './App.vue';
import {
	NMessageProvider,
	NConfigProvider,
	zhCN,
	dateZhCN,
	darkTheme,
	useOsTheme,
} from 'naive-ui';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const osThemeRef = useOsTheme();

// 主题
const theme = computed(() => {
	if (userStore.theme === 'auto') {
		return osThemeRef.value === 'dark' ? darkTheme : null;
	} else {
		return userStore.theme === 'dark' ? darkTheme : null;
	}
});
</script>

<style></style>
