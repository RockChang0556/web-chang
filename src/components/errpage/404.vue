<!--
 * @Author: Rock Chang
 * @Date: 2021-08-21 18:25:13
 * @LastEditTime: 2022-01-13 11:07:08
 * @Description: 
-->

<template>
	<div class="errpage errpage-404">
		<img :src="img404Url" alt="啊哦, 页面找不到了" />
		<p>啊哦, 页面找不到了</p>
		<router-link to="/">
			<button>回到首页</button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { img404Url } from '@/config/constants';
export default defineComponent({
	name: 'errpage-404',
	components: {},
	props: {},
	setup() {
		return { img404Url };
	},
});
</script>

<style lang="less">
.el-empty__image {
	width: 400px;
	padding: 50px 0;
}
</style>

