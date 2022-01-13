<!--
 * @Author: Rock Chang
 * @Date: 2021-08-21 17:26:16
 * @LastEditTime: 2022-01-13 10:44:55
 * @Description: 
-->
<template>
	<div class="errpage-wrap">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'errpage-wrap',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.errpage-wrap {
	min-height: 100vh;
}
.errpage {
	padding-top: 100px;
	text-align: center;
	> p {
		color: #909399;
		margin: 10px 0;
		font-size: 16px;
	}
	button {
		padding: 10px 22px;
		cursor: pointer;
	}
}
</style>
