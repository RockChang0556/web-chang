<!--
 * @Author: Rock Chang
 * @Date: 2021-08-20 18:01:56
 * @LastEditTime: 2021-12-30 20:33:40
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

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { avatarDefaultUrl } from '@/config/constants';
import { NAvatar } from 'naive-ui';

export default defineComponent({
	name: 'com-avatar',
	components: { NAvatar },
	props: {
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
	},
	setup(props) {
		const avatarUrl = computed(
			() => `${import.meta.env.VITE_FILE_BASE}${props.src}`
		);

		return {
			avatarUrl,
			avatarDefaultUrl,
		};
	},
});
</script>

<style lang="less">
.com-avatar {
	display: flex;
	border-radius: 50%;
}
</style>

