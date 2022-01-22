<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 20:26:50
 * @LastEditTime: 2022-01-22 14:26:03
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

		<!-- 心愿单基本信息 -->
		<wish-form
			v-if="!wishFormRes.loading"
			:wishid="wishid"
			ref="wishFormRef"
			:models="wishFormRes.data"
			@change="
				(data) => {
					wishFormRes.data = data;
				}
			"
		></wish-form>
		<!-- 心愿单基本信息 - 骨架屏 -->
		<n-space vertical v-else>
			<n-skeleton height="50px" :sharp="false" />
			<n-skeleton height="120px" :sharp="false" />
			<n-space>
				<n-skeleton height="40px" width="100px" :sharp="false" />
				<n-skeleton height="40px" width="80px" :sharp="false" />
				<n-skeleton height="40px" circle />
			</n-space>
		</n-space>

		<!-- 菜品列表 -->
		<n-spin :show="wishFoods.loading">
			<div class="foods">
				<div class="foods-label">
					<div class="title">
						<span>包含菜品 {{ wishFoods.data.length || 0 }}</span>
						<n-button
							circle
							:class="{ active: showSearch }"
							@click="showSearch = !showSearch"
						>
							<template #icon>
								<r-icon name="add"></r-icon>
							</template>
						</n-button>
					</div>
					<n-collapse-transition :show="showSearch">
						<FoodSearch :wishid="wishid" @add="onAddWishFood"></FoodSearch>
					</n-collapse-transition>
				</div>
				<n-list class="food-list" v-if="wishFoods.data.length">
					<FoodListItem
						v-for="v in wishFoods.data"
						:key="v.id"
						:item="v"
						@delete="onDeleteWishFood"
					></FoodListItem>
				</n-list>
				<n-empty v-else description="此心愿单下暂无菜品, 快去添加吧"> </n-empty>
			</div>
		</n-spin>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
	NList,
	NBreadcrumb,
	NBreadcrumbItem,
	NSpace,
	NSkeleton,
	NCollapseTransition,
} from 'naive-ui';

import { WishApi } from '@/services';
import { objProp } from '@/types/types';
import WishForm from './wish-form.vue';
import FoodListItem from './food-list-item.vue';
import FoodSearch from './food-search.vue';

interface wishBaseProp extends objProp {
	name?: string;
	summary?: string;
	tag?: string[];
}
const props = defineProps({
	// params参数
	wishid: {
		type: String,
	},
});

const route = useRoute();
// 是否展开显示搜索框
const showSearch = ref(false);
const { wishFormRes, getBaseData } = useWishBase(props.wishid);
const { wishFoods, getFoodsData } = useWishFoods(props.wishid);

// 在心愿单内添加菜品后的回调
const onAddWishFood = async (id: string) => {
	await WishApi.updateWishFoods(
		{ wishid: props.wishid },
		{ type: 'add', food_ids: [id] }
	);
	getFoodsData();
};

// 在心愿单内删除菜品
const onDeleteWishFood = async (id: string) => {
	await WishApi.updateWishFoods(
		{ wishid: props.wishid },
		{ type: 'delete', food_ids: [id] }
	);
	getFoodsData();
};

const created = () => {
	// 编辑状态获取数据
	if (route.name === 'editwish') {
		getBaseData();
		getFoodsData();
	}
};
created();

// 心愿单基本信息
function useWishBase(wishid?: string) {
	const wishFormRes: { data: wishBaseProp; loading: boolean } = reactive({
		data: {},
		loading: false,
	});
	// 获取 wish 基本数据
	const getBaseData = async () => {
		try {
			wishFormRes.loading = true;
			const { data } = await WishApi.getWishBase({ wishid });
			wishFormRes.data = data;
		} finally {
			wishFormRes.loading = false;
		}
	};
	return { wishFormRes, getBaseData };
}

function useWishFoods(wishid?: string) {
	const wishFoods: { data: any[]; loading: boolean } = reactive({
		data: [],
		loading: false,
	});
	// 获取 wish 基本数据
	const getFoodsData = async () => {
		try {
			wishFoods.loading = true;
			const { data } = await WishApi.getWishFoods({ wishid });
			wishFoods.data = data;
		} finally {
			wishFoods.loading = false;
		}
	};
	return { wishFoods, getFoodsData };
}
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
	.foods {
		.foods-label {
			padding: 20px 0 15px;
			font-size: 20px;
			color: #c0ae7d;
			.title {
				display: flex;
				.n-button {
					margin-left: 20px;
					transition: 0.3s;
					width: 30px;
					height: 30px;
					&.active {
						transform: rotate(45deg);
					}
				}
			}
		}
		.food-search {
			margin-top: 10px;
		}
	}
}
</style>
