<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 17:16:22
 * @LastEditTime: 2022-01-09 14:57:11
 * @Description: jd查找菜品
-->
<template>
	<div class="food-search">
		<n-popover
			class="food-search-popover"
			width="trigger"
			placement="bottom"
			trigger="manual"
			:show-arrow="false"
			:show="searchResult.showPopover"
			@clickoutside="searchResult.showPopover = false"
		>
			<template #trigger>
				<n-input
					placeholder="输入想吃的, 回车搜索"
					@update:value="handleSearch"
				></n-input>
			</template>
			<div class="food-search-list">
				<div
					class="food-search-item"
					v-for="v in searchResult.data"
					:key="v.id"
				>
					<img :src="v.pic" alt="" srcset="" />
					<div class="content">
						{{ v.name }}
					</div>
					<n-button text type="success" @click="onAddFoodToWish(v)"
						>加入此心愿单
					</n-button>
				</div>
			</div>
			<n-divider />
			<p class="custom-btn">
				没有想吃的?
				<n-button text type="info" @click="onAddFoodToWish">自定义</n-button>
				一个吧
			</p>
		</n-popover>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { NPopover, NDivider } from 'naive-ui';
import { FoodApi, WishApi } from '@/services';

interface searchResultProp {
	loading: boolean;
	data: any[];
	showPopover: boolean;
}
export default defineComponent({
	name: 'food-search',
	components: { NPopover, NDivider },
	props: {
		// params参数
		wishid: {
			type: String,
		},
	},
	setup(props, context) {
		const searchResult: searchResultProp = reactive({
			loading: false,
			data: [],
			showPopover: false,
		});
		const handleSearch = debounce((val: string) => {
			const value = val.trim();
			if (!value) return;
			searchResult.loading = true;
			axios
				.get('/jisuapi/search', {
					params: {
						keyword: value,
						start: 0,
						num: 20,
						appkey: 'a6c59a2ffa28433481c82f3878727a49',
					},
				})
				.then(res => {
					const resl = res.data?.result;
					if (resl?.status === 0) {
						searchResult.data = resl?.result.list;
					} else {
						searchResult.data = [];
					}
				})
				.finally(() => {
					searchResult.loading = false;
					searchResult.showPopover = true;
				});
		}, 600);

		// 添加菜品至心愿单
		const onAddFoodToWish = async (item: any) => {
			await FoodApi.addFood(item);
			searchResult.showPopover = false;
			context.emit('add', item.id);
		};

		return {
			handleSearch,
			searchResult,
			onAddFoodToWish,
		};
	},
});
</script>

<style lang="less">
.food-search-popover {
	padding: 8px 0 !important;
	.food-search-list {
		overflow-y: auto;
		max-height: 400px;
	}
	.food-search-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 3px 0;
		padding: 5px 14px;
		&:hover {
			background: rgb(243, 243, 245);
		}
		> img {
			width: 80px;
			flex-shrink: 0;
		}
		.content {
			flex: 1;
			padding-left: 10px;
		}
		.n-button {
			flex-shrink: 0;
		}
	}
	.n-divider {
		margin: 0;
	}
	.custom-btn {
		padding: 0 14px;
		height: 44px;
		.n-button {
			height: 44px;
		}
	}
}
</style>

