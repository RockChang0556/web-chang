<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 20:26:50
 * @LastEditTime: 2022-01-08 16:24:33
 * @Description: 新增心愿单
-->

<template>
	<div class="addwish-page">
		<h1>新增心愿单</h1>
		<wish-form ref="wishFormRef"></wish-form>
		<div class="foods">
			<p class="foods-label">包含菜品</p>
			<div>新增页不支持添加菜品, 快去详情页添加吧</div>
		</div>
		<div class="handle-btns">
			<n-button @click="onResetForm">重置</n-button>
			<n-button type="primary" @click="onAddWish">确认</n-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { WishApi } from '@/services';
import WishForm, { modelProp } from './wish-form.vue';
export default defineComponent({
	name: 'addwish-page',
	components: { WishForm },
	props: {},
	setup() {
		const router = useRouter();
		const wishFormRef = ref();

		// 重置表单
		const onResetForm = () => {
			wishFormRef.value.resetForm();
		};

		// 添加心愿单
		const onAddWish = () => {
			wishFormRef.value
				.validateForm()
				.then(async (result: modelProp) => {
					const data = {
						name: result.name,
						summary: result.summary,
						tag: result.tags.join(','),
					};
					await WishApi.addWish(data);
					window.$message.success('创建成功');
					router.push({ name: 'mywish' });
				})
				.catch(() => {
					window.$message.error('请检查表单项');
				});
		};

		const foods = ref([]);
		return { wishFormRef, foods, onResetForm, onAddWish };
	},
});
</script>

<style lang="less">
.addwish-page {
	width: 800px;
	height: 100%;
	margin: 0 auto;
	padding: 50px 0;
	> h1 {
		color: #c0ae7d;
		margin-bottom: 10px;
	}
	.n-form-item-label,
	.foods-label {
		font-size: 20px;
		color: #c0ae7d;
		height: 30px;
	}
	.handle-btns {
		text-align: center;
		margin-top: 20px;
		.n-button {
			width: 140px;
			height: 56px;
			&:nth-of-type(2) {
				margin-left: 20px;
			}
		}
	}
}
</style>

