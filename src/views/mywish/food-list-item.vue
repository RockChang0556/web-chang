<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 16:14:39
 * @LastEditTime: 2022-01-08 16:17:46
 * @Description: 菜品卡片
-->
<template>
	<div class="wish-food-list-item">
		{{ item.name }}
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
	name: 'wish-food-list-item',
	components: {},
	props: {
		item: {
			type: Object as PropType<any>,
			require: true,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="less"></style>

