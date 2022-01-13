<!--
 * @Author: Rock Chang
 * @Date: 2021-08-21 18:25:13
 * @LastEditTime: 2022-01-13 11:07:31
 * @Description: 
-->

<template>
	<div class="errpage errpage-403">
		<img :src="img403Url" alt="你还没有此页面的权限哦" />
		<p>你还没有此页面的权限哦</p>
		<router-link to="/">
			<button>回到首页</button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { img403Url } from '@/config/constants';

export default defineComponent({
	name: 'errpage-403',
	components: {},
	props: {},
	setup() {
		return { img403Url };
	},
});
</script>

<style lang="less"></style>

