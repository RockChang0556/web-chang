<!--
 * @Author: Rock Chang
 * @Date: 2021-08-05 14:50:24
 * @LastEditTime: 2022-01-26 21:10:28
 * @Description: 布局组件 - 头部
-->
<template>
	<div class="global-header">
		<div class="header-logo">
			<a :href="homeUrl" class="a-home">
				<img src="/logo.png" alt="logo" />
			</a>
			<span class="divider">|</span>
			<router-link to="/" class="a-current">
				<n-button text>今天吃啥</n-button>
			</router-link>
		</div>
		<div class="header-right">
			<!-- 主题 -->
			<n-dropdown :options="themeOption">
				<r-icon :name="themeIcon"></r-icon>
			</n-dropdown>
			<div v-if="!user.id">
				<a :href="loginUrl">
					<n-button type="danger">登录</n-button>
				</a>
			</div>
			<n-dropdown v-else :options="userOption">
				<div class="userinfo">
					<Avatar :size="36" :src="user.avatar_url"> </Avatar>
					{{ user.name }}
					<r-icon name="caret-down-small"></r-icon>
				</div>
			</n-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { h, computed, PropType } from 'vue';
import router from '@/router';
import { NDropdown } from 'naive-ui';
import { useUserStore } from '@/store';
import { UserProps, themeProp } from '@/types/types';
import { homeUrl, loginUrl, logoutUrl, userInfoUrl } from '@/constants';
import Avatar from '@/components/avatar.vue';
import RIcon from '@/components/global/icon/index.vue';
const userStore = useUserStore();

defineProps({
	user: {
		type: Object as PropType<UserProps>,
		default: () => ({}),
	},
});

// 主题
const { themeOption, iconConfig } = useThemeOption();
const themeIcon = computed(() => {
	let theme = userStore.theme;
	if (!['light', 'dark', 'auto'].includes(theme)) theme = 'light';
	return iconConfig[theme];
});

// 用户下拉菜单
const { userOption } = useUserOption();

function renderIcon(icon: string) {
	return () => {
		return h(RIcon, { name: icon });
	};
}
function useThemeOption() {
	const iconConfig = {
		auto: 'rxa-circle-auto-lined',
		dark: 'moon',
		light: 'sun',
	};
	const changeTheme = (theme: themeProp) => {
		userStore.setTheme(theme);
	};

	const options = [
		{
			label: '跟随电脑',
			key: 'auto',
			icon: renderIcon(iconConfig.auto),
			props: {
				onClick: () => {
					changeTheme('auto');
				},
			},
		},
		{
			label: '夜间模式',
			key: 'dark',
			icon: renderIcon(iconConfig.dark),
			props: {
				onClick: () => {
					changeTheme('dark');
				},
			},
		},
		{
			label: '日间模式',
			key: 'light',
			icon: renderIcon(iconConfig.light),
			props: {
				onClick: () => {
					changeTheme('light');
				},
			},
		},
	];
	return { themeOption: options, iconConfig };
}
function useUserOption() {
	const options = [
		{
			label: '个人信息',
			key: 'circle',
			icon: renderIcon('user-circle'),
			props: {
				onClick: () => {
					location.href = userInfoUrl;
				},
			},
		},
		{
			label: '我的厨房',
			key: 'mykitchen',
			icon: renderIcon('heart'),
			props: {
				onClick: () => {
					router.push({ name: 'mykitchen' });
				},
			},
		},
		{
			label: '退出',
			key: 'logout',
			icon: renderIcon('logout'),
			props: {
				onClick: () => {
					location.href = logoutUrl;
				},
			},
		},
	];
	return { userOption: options };
}
</script>

<style lang="less">
.global-header {
	// position: fixed;
	// top: 0;
	// right: 0;
	// left: 0;
	// z-index: 1999;
	height: 70px;
	line-height: 70px;
	padding: 8px 2rem;
	// background-color: white;
	border-top: 4px solid mix(purple, white);
	display: flex;
	justify-content: space-between;
	align-items: center;
	.header-logo {
		height: 50px;
		display: flex;
		align-items: center;
		.divider {
			font-size: 40px;
			color: #ccc;
			padding: 0 5px;
		}
		> a,
		span {
			display: inline-block;
			height: 50px;
			line-height: 50px;
		}
		img {
			height: 50px;
		}
	}
	.header-right {
		display: flex;
		align-items: center;
		.icon {
			font-size: 18px;
			cursor: pointer;
		}
		.com-avatar {
			margin: 0 5px 0 15px;
		}
		.userinfo {
			cursor: pointer;
			height: 40px;
			display: flex;
			align-items: center;
		}
	}
}

// element
.header-user-dropdown {
	a {
		color: var(--el-text-color-regular);
		&:hover {
			background-color: var(--el-dropdown-menuItem-hover-fill);
			color: var(--el-dropdown-menuItem-hover-color);
		}
	}
}
</style>
