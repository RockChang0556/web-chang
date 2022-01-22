<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
		<n-message-provider>
			<App />
		</n-message-provider>
	</n-config-provider>
</template>

<script lang="ts" setup>
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
import { useStore } from 'vuex';

const store = useStore();
const osThemeRef = useOsTheme();

// 主题
const theme = computed(() => {
	if (store.state.user.theme === 'auto') {
		return osThemeRef.value === 'dark' ? darkTheme : null;
	} else {
		return store.state.user.theme === 'dark' ? darkTheme : null;
	}
});
</script>
<script lang="ts">
export default {
	name: 'app-wrap',
};
</script>

<style></style>
