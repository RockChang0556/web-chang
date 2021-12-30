<template >
	<n-config-provider :theme="theme">
		<n-message-provider>
			<app></app>
		</n-message-provider>
	</n-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import App from './App.vue';
import {
	NMessageProvider,
	NConfigProvider,
	darkTheme,
	useOsTheme,
} from 'naive-ui';
import { useStore } from 'vuex';

export default defineComponent({
	name: 'AppWrap',
	components: { NMessageProvider, NConfigProvider, App },
	setup() {
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
		return { theme };
	},
});
</script>

<style>
</style>
