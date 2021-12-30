<!--
 * @Author: Rock Chang
 * @Date: 2021-08-05 14:50:24
 * @LastEditTime: 2021-12-30 18:45:57
 * @Description: 布局组件 - 头部
-->
<template>
	<div class="global-header" v-if="user.isFetched">
		<div class="header-logo">
			<a :href="homeUrl" class="a-home">
				<img src="/logo.png" alt="logo" />
			</a>
			<span class="divider">|</span>
			<router-link to="/" class="a-current">
				<n-button text>今天吃什么</n-button>
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
			<avatar v-else :size="36" :src="user.avatar_url"> </avatar>
		</div>
	</div>
</template>

<script lang="ts">
import { h, computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { UserProps } from '@/store/modules/user';
import RIcon from '@/components/global/icon/index.vue';
import Avatar from '@/components/avatar.vue';
import router from '@/router';
import { homeUrl, loginUrl } from '@/config/constants';
import { themeProp } from '@/store/modules/user';
import { NDropdown } from 'naive-ui';
import store from '@/store';

export default defineComponent({
	name: 'global-header',
	components: { Avatar, NDropdown },
	props: {
		user: {
			type: Object as PropType<UserProps>,
			default: () => ({}),
		},
	},
	setup() {
		const store = useStore();

		// 主题
		const themeOption = useThemeOption();
		const themeIcon = computed(() => {
			const theme: themeProp = store.state.user.theme;
			const obj = { auto: 'automaticForecast', dark: 'moon_', light: 'sun' };
			return obj[theme];
		});

		const logout = () => {
			store.dispatch('user/logout');
			router.push('/');
		};

		return {
			logout,
			homeUrl,
			loginUrl,
			themeIcon,
			themeOption,
		};
	},
});

function useThemeOption() {
	const renderIcon = (icon: string) => {
		return () => {
			return h(RIcon, { name: icon });
		};
	};

	const changeTheme = (theme: string) => {
		console.log('', 1);
		store.commit('user/setTheme', theme);
	};

	const options = [
		{
			label: '跟随电脑',
			key: 'auto',
			icon: renderIcon('automaticForecast'),
			props: {
				onClick: () => {
					changeTheme('auto');
				},
			},
		},
		{
			label: '夜间模式',
			key: 'dark',
			icon: renderIcon('moon_'),
			props: {
				onClick: () => {
					changeTheme('dark');
				},
			},
		},
		{
			label: '日间模式',
			key: 'light',
			icon: renderIcon('sun'),
			props: {
				onClick: () => {
					changeTheme('light');
				},
			},
		},
	];
	return options;
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
