<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 20:26:50
 * @LastEditTime: 2022-01-12 14:49:28
 * @Description: 心愿单详情
-->

<template>
	<div class="editwish-page">
		<n-breadcrumb separator=">">
			<n-breadcrumb-item>
				<router-link :to="{ name: 'home' }"> 首页 </router-link>
			</n-breadcrumb-item>
			<n-breadcrumb-item>
				<router-link :to="{ name: 'mywish' }"> 我的心愿单 </router-link>
			</n-breadcrumb-item>
			<n-breadcrumb-item> 心愿单详情 </n-breadcrumb-item>
		</n-breadcrumb>
		<n-spin :show="wishFormRes.loading">
			<wish-form
				v-if="!wishFormRes.loading"
				:wishid="wishid"
				ref="wishFormRef"
				:models="wishFormRes.data"
			></wish-form>
			<n-space vertical v-else>
				<n-skeleton height="50px" :sharp="false" />
				<n-skeleton height="120px" :sharp="false" />
				<n-space>
					<n-skeleton height="40px" width="100px" :sharp="false" />
					<n-skeleton height="40px" width="80px" :sharp="false" />
					<n-skeleton height="40px" circle />
				</n-space>
			</n-space>

			<div class="foods">
				<p class="foods-label">包含菜品</p>
				<food-search :wishid="wishid" @add="onAddWishFood"></food-search>
				<n-list class="food-list" v-if="wishFormRes.data.food_list?.length">
					<food-list-item
						v-for="v in wishFormRes.data.food_list"
						:key="v.id"
						:item="v"
						@delete="onDeleteWishFood"
					></food-list-item>
				</n-list>
				<div v-else>此心愿单下暂无菜品, 快去详情页添加吧</div>
			</div>
		</n-spin>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
	NList,
	NBreadcrumb,
	NBreadcrumbItem,
	NSpace,
	NSkeleton,
} from 'naive-ui';

import { WishApi } from '@/services';
import { objProp } from '@/types/types';
import WishForm from './wish-form.vue';
import FoodListItem from './food-list-item.vue';
import FoodSearch from './food-search.vue';

interface wishProp extends objProp {
	food_list?: any[];
}
export default defineComponent({
	name: 'editwish-page',
	components: {
		NList,
		NBreadcrumb,
		NBreadcrumbItem,
		NSpace,
		NSkeleton,
		WishForm,
		FoodListItem,
		FoodSearch,
	},
	props: {
		// params参数
		wishid: {
			type: String,
		},
	},
	setup(props) {
		const route = useRoute();
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

		// 在心愿单内添加菜品后的回调
		const onAddWishFood = async (id: string) => {
			await WishApi.updateWishFoods(
				{ wishid: props.wishid },
				{ type: 'add', food_ids: [id] }
			);
			getData();
		};
		// 在心愿单内删除菜品
		const onDeleteWishFood = async (id: string) => {
			await WishApi.updateWishFoods(
				{ wishid: props.wishid },
				{ type: 'delete', food_ids: [id] }
			);
			getData();
		};

		const created = () => {
			// 编辑状态获取数据
			if (route.name === 'editwish') {
				getData();
			}
		};
		created();
		return {
			wishFormRes,
			onAddWishFood,
			onDeleteWishFood,
		};
	},
});
</script>

<style lang="less">
.editwish-page {
	width: 800px;
	height: 100%;
	margin: 0 auto;
	padding: 20px 0 20px;
	.wish-form {
		margin-top: 20px;
	}
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
}
</style>

