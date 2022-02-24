<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
		<n-global-style />
		<n-loading-bar-provider :loading-bar-style="loadingBarStyle">
			<loading-bar />
			<n-dialog-provider>
				<dialog-content />
				<n-message-provider>
					<message-content />
					<n-notification-provider>
						<n-el tag="div">
							<slot name="default"></slot>
						</n-el>
					</n-notification-provider>
				</n-message-provider>
			</n-dialog-provider>
		</n-loading-bar-provider>
	</n-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
	NConfigProvider,
	NGlobalStyle,
	NLoadingBarProvider,
	NMessageProvider,
	NDialogProvider,
	NNotificationProvider,
	zhCN,
	dateZhCN,
	darkTheme,
	useOsTheme,
	NEl,
} from 'naive-ui';

import { useUserStore } from '@/store';
import MessageContent from './MessageContent.vue';
import DialogContent from './DialogContent.vue';
import LoadingBar from './LoadingBar.vue';

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

const loadingBarStyle = {
	loading: {
		height: '4px',
	},
	error: {
		height: '4px',
	},
};
</script>
