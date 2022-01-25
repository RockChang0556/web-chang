<!--
 * @Author: Rock Chang
 * @Date: 2022-01-24 16:57:35
 * @LastEditTime: 2022-01-25 22:59:57
 * @Description: 我喜欢的
-->

<template>
	<div class="like-wrap">
		<n-spin :show="likeFoods.loading">
			<n-list class="food-list" v-if="likeFoods.data?.length">
				<FoodListItem v-for="v in likeFoods.data" :item="v" :key="v.id">
					<template #handle>
						<n-popconfirm @positive-click="onDeleteFood(v.id)">
							<template #trigger>
								<n-button text type="error"> 删除 </n-button>
							</template>
							确定要删除此菜品吗
						</n-popconfirm>
					</template>
				</FoodListItem>
				<template #footer>
					<n-pagination
						v-model:page="pageParams.page_index"
						:page-size="pageParams.page_size"
						:item-count="likeFoods.count"
						@update:page="changePage"
					/>
				</template>
			</n-list>
			<n-empty v-else size="huge">
				你还没有菜品哦,
				<router-link :to="{ name: 'addwish' }">
					<n-button text type="primary">新建</n-button>
				</router-link>
				一个吧
			</n-empty>
		</n-spin>
	</div>
</template>

<script lang="ts" setup name="LikeIndex">
import { reactive } from 'vue';
import { NList, NPagination, NPopconfirm } from 'naive-ui';
import { FoodApi } from '@/services';
import { pagesProp } from '@/types/types';
import FoodListItem from '@/views/mywish/food-list-item.vue';

const { likeFoods, getLikeFoods, pageParams, changePage } = useFoodList();
const onDeleteFood = async (id: string) => {
	await FoodApi.deleteFood({ foodid: id });
	getLikeFoods();
};

// 获取菜品点赞情况
const created = () => {
	getLikeFoods();
};
created();

// 菜品详情
function useFoodList() {
	// 查询参数 - 分页
	const pageParams: pagesProp = reactive({
		page_index: 1,
		page_size: 10,
	});
	// 当前页改变
	const changePage = (page: number) => {
		pageParams.page_index = page;
		getLikeFoods();
	};
	const likeFoods: { loading: boolean; data: any; count: number } = reactive({
		loading: false,
		data: null,
		count: 0,
	});
	// 获取我喜欢的菜品
	const getLikeFoods = async () => {
		try {
			likeFoods.loading = true;
			const { data } = await FoodApi.getLikeFoods({
				pages: pageParams,
				orders: { updated_at: 'desc' },
			});
			likeFoods.data = data.rows;
			likeFoods.count = data.count;
		} finally {
			likeFoods.loading = false;
		}
	};
	return {
		likeFoods,
		getLikeFoods,
		pageParams,
		changePage,
	};
}
</script>

<style lang="less"></style>
