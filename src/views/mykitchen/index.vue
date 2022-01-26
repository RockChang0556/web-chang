<!--
 * @Author: Rock Chang
 * @Date: 2022-01-21 16:10:35
 * @LastEditTime: 2022-01-26 14:07:33
 * @Description: 我的厨房
-->
<template>
	<div class="mykitchen-page">
		<div class="profile">
			<div class="profile-avatar">
				<Avatar :src="userInfo.avatar_url" class="profile-img"></Avatar>
				<div class="profile-name">{{ userInfo.name }}</div>
			</div>
			<!-- <img :src="bgImg" alt="" class="profile-cover" /> -->
			<n-tabs
				type="line"
				class="profile-menu"
				:value="(routeName as string)"
				@update:value="onChangeTab"
			>
				<n-tab name="mywish">心愿单</n-tab>
				<n-tab name="foods">菜品</n-tab>
				<n-tab name="likes">我赞过的</n-tab>
			</n-tabs>
		</div>
		<router-view></router-view>
	</div>
</template>

<script lang="ts" setup name="KitchenIndex">
import { computed } from 'vue';
import { NTabs, NTab } from 'naive-ui';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store';
import router from '@/router';
import Avatar from '@/components/avatar.vue';

const route = useRoute();
// 用户信息
const { userInfo } = useUserStore();

const routeName = computed(() => route.name);
// 切换tab
const onChangeTab = (value: string) => {
	router.push({ name: value });
};
</script>

<style lang="less">
.mykitchen-page {
	width: 800px;
	height: 100%;
	margin: 0 auto;
	padding: 20px 0;
	.profile {
		position: relative;
		height: 40vh;
		min-height: 200px;
		max-height: 300px;
		z-index: 1;
		box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
			0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
		border-radius: 6px;
		&-cover {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: calc(100% - 69px);
			object-fit: cover;
			object-position: center;
			border-radius: 4px;
		}

		&:before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
			background-image: url();
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			filter: blur(50px);
			opacity: 0.7;
		}
		.profile-menu {
			position: absolute;
			bottom: 0;
			padding-left: 200px;
			width: 100%;
			background: #fff;
			border-radius: 0 0 4px 4px;
		}

		.profile-avatar {
			position: absolute;
			align-items: center;
			display: flex;
			z-index: 1;
			bottom: 16px;
			left: 24px;
			width: 150px;
			.profile-img {
				flex-shrink: 0;
				width: 150px;
				height: 150px;
				border-radius: 50%;
				object-fit: cover;
				border: 2px solid #151728;
			}

			.profile-name {
				margin-left: 24px;
				margin-bottom: 24px;
				font-size: 22px;
				color: #999;
				font-weight: 600;
				flex-shrink: 0;
			}
		}
	}
}
@media screen and (max-width: 800px) {
	.mykitchen-page .profile {
		.profile-avatar {
			top: -25px;
			left: 50%;
			transform: translatex(-50%);
			align-items: center;
			flex-direction: column;
			justify-content: center;
			.profile-img {
				height: 100px;
				width: 100px;
			}
			.profile-name {
				margin: 5px 0;
			}
		}
		.profile-menu {
			padding-left: 0;
			width: 100%;
			overflow: auto;
			justify-content: center;
		}
	}
}
</style>
