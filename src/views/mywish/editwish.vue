<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 20:26:50
 * @LastEditTime: 2022-01-08 16:26:23
 * @Description: 编辑心愿单
-->

<template>
	<div class="editwish-page">
		<h1>编辑心愿单</h1>
		<n-spin :show="wishFormRes.loading">
			<wish-form
				v-if="!wishFormRes.loading"
				ref="wishFormRef"
				:models="wishFormRes.data"
			></wish-form>
			<div class="foods">
				<p class="foods-label">包含菜品</p>
				<div class="food-list" v-if="wishFormRes.data.food_list?.length">
					<food-list-item
						v-for="v in wishFormRes.data.food_list"
						:key="v.id"
						:item="v"
					></food-list-item>
				</div>
				<div v-else>此心愿单下暂无菜品, 快去详情页添加吧</div>
			</div>
		</n-spin>
		<div class="handle-btns">
			<n-button @click="onResetForm">重置</n-button>
			<n-button type="primary" @click="onUpdateWish" :loading="okBtnLoading">
				确认
			</n-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { WishApi } from '@/services';
import WishForm, { modelProp } from './wish-form.vue';
import FoodListItem from './food-list-item.vue';
import { objProp } from '@/types/types';

interface wishProp extends objProp {
	food_list?: any[];
}
export default defineComponent({
	name: 'editwish-page',
	components: { WishForm, FoodListItem },
	props: {
		// params参数
		wishid: {
			type: String,
		},
	},
	setup(props) {
		const router = useRouter();
		const wishFormRef = ref();
		const wishFormRes: { data: wishProp; loading: boolean } = reactive({
			data: {},
			loading: false,
		});

		// 获取 wish 数据
		const getData = async () => {
			try {
				wishFormRes.loading = true;
				const { data } = await WishApi.getWishDetail({ wishid: props.wishid });
				wishFormRes.data = data;
			} finally {
				wishFormRes.loading = false;
			}
		};
		getData();

		// 重置表单
		const onResetForm = () => {
			wishFormRef.value.resetForm();
		};

		const okBtnLoading = ref(false);
		// 更新心愿单
		const onUpdateWish = () => {
			wishFormRef.value
				.validateForm()
				.then(async (result: modelProp) => {
					const data = {
						name: result.name,
						summary: result.summary,
						tag: result.tags.join(','),
					};
					try {
						okBtnLoading.value = true;
						await WishApi.updateWish({ wishid: props.wishid }, data);
						window.$message.success('更新成功');
						router.push({ name: 'mywish' });
					} finally {
						okBtnLoading.value = false;
					}
				})
				.catch(() => {
					window.$message.error('请检查表单项');
				});
		};

		const foods = ref([]);
		return {
			wishFormRef,
			foods,
			onResetForm,
			onUpdateWish,
			wishFormRes,
			okBtnLoading,
		};
	},
});
</script>

<style lang="less">
.editwish-page {
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

