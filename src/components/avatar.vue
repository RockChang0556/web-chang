<!--
 * @Author: Rock Chang
 * @Date: 2021-08-20 18:01:56
 * @LastEditTime: 2022-02-25 17:08:46
 * @Description: 头像组件
-->

<template>
	<div class="com-avatar">
		<n-avatar
			round
			:size="size"
			:src="avatarUrl"
			:fallback-src="avatarDefaultUrl"
		>
		</n-avatar>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { avatarDefaultUrl } from '@/constants';
const props = defineProps({
	// 头像地址
	src: {
		type: String,
		default: '',
	},
	// 头像大小
	size: {
		type: Number,
		default: 36,
	},
	// 是否显示人员信息
	isShowInfo: {
		type: Boolean,
		default: true,
	},
});

const avatarUrl = computed(
	() => `${import.meta.env.VITE_FILE_BASE}${props.src}`
);
</script>

<style lang="less">
.com-avatar {
	width: 36px;
	display: flex;
	border-radius: 50%;
	.n-avatar {
		width: 100%;
		height: 100%;
	}
}
</style>
