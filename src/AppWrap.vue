<template >
	<n-config-provider :theme="null">
		<n-message-provider>
			<app></app>
		</n-message-provider>
	</n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui';
import App from './App.vue';

export default defineComponent({
	name: 'AppWrap',
	components: { NMessageProvider, NConfigProvider, App },
	setup() {
		return { darkTheme };
	},
});
</script>

<style>
</style>
