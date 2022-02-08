<!--
 * @Author: Rock Chang
 * @Date: 2022-01-24 16:55:42
 * @LastEditTime: 2022-02-08 15:39:18
 * @Description: 菜品
-->
<template>
	<div class="food-wrap">
		<n-spin :show="foodList.loading">
			<n-list class="food-list" v-if="foodList.data?.length">
				<FoodListItem v-for="v in foodList.data" :item="v" :key="v.id">
					<template #handle>
						<span class="edit">
							<r-icon name="bianji"></r-icon>
							<span>编辑</span>
						</span>
						<n-popconfirm @positive-click="onDeleteFood(v.id)">
							<template #trigger>
								<span class="delete">
									<r-icon name="line_shanchu"></r-icon>
									<span>删除</span>
								</span>
							</template>
							确定要删除此菜品吗
						</n-popconfirm>
					</template>
				</FoodListItem>
				<template #footer>
					<n-pagination
						v-model:page="pageParams.page_index"
						:page-size="pageParams.page_size"
						:item-count="foodList.count"
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

<script lang="ts" setup name="FoodIndex">
import { onMounted, reactive } from 'vue';
import { NList, NPagination, NPopconfirm } from 'naive-ui';
import { FoodApi } from '@/services';
import { pagesProp } from '@/types/types';
import FoodListItem from '@/views/mywish/food-list-item.vue';

const { foodList, getFoodData, pageParams, changePage } = useFoodList();
const onDeleteFood = async (id: string) => {
	await FoodApi.deleteFood({ foodid: id });
	getFoodData();
};

onMounted(() => {
	getFoodData();
});

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
		getFoodData();
	};
	const foodList: { loading: boolean; data: any; count: number } = reactive({
		loading: false,
		data: null,
		count: 0,
	});
	// 获取菜品详情
	const getFoodData = async () => {
		try {
			foodList.loading = true;
			const { data } = await FoodApi.getMyFoods({
				pages: pageParams,
				orders: { created_at: 'desc' },
			});
			foodList.data = data.rows;
			foodList.count = data.count;
		} finally {
			foodList.loading = false;
		}
	};
	return {
		foodList,
		getFoodData,
		pageParams,
		changePage,
	};
}
</script>

<style lang="less"></style>
