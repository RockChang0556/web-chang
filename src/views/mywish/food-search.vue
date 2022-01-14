<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 17:16:22
 * @LastEditTime: 2022-01-14 20:02:34
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
					v-model:value.trim="searchVal"
					placeholder="搜索菜品, 食材"
					round
					clearable
					@update:value="handleSearch"
				>
					<template #suffix>
						<r-icon name="sousuo"></r-icon>
					</template>
				</n-input>
			</template>
			<n-spin :show="searchResult.loading">
				<div class="food-search-list">
					<div
						class="food-search-item"
						v-if="searchResult.data?.length"
						v-for="v in searchResult.data"
						:key="v.id"
						@click="onAddFoodToWish(v)"
					>
						<n-popover
							class="food-search-item-popover"
							trigger="hover"
							placement="top-start"
							:show-arrow="false"
						>
							<template #trigger>
								<r-icon name="browse"></r-icon>
							</template>
							<n-image
								:src="v.pic"
								preview-disabled
								:fallback-src="imgFoodUrl"
							></n-image>
						</n-popover>
						<div class="content">
							{{ v.name }}
						</div>
					</div>
					<n-empty v-else description="暂无内容"></n-empty>
				</div>
				<n-divider />
				<p class="custom-food-wrap">
					没有想吃的?
					<n-input
						v-model:value.trim="customFoodVal"
						placeholder="输入菜名, 回车, 即可快速添加至此心愿单"
						size="small"
						round
						clearable
						@keyup.enter="onAddCustomFood"
					></n-input>
				</p>
			</n-spin>
		</n-popover>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { NPopover, NDivider } from 'naive-ui';
import { imgFoodUrl } from '@/config/constants';
import { FoodApi } from '@/services';

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
		const { searchResult, searchVal, handleSearch } = useSearch();
		// 添加菜品至心愿单
		const onAddFoodToWish = async (item: any) => {
			await FoodApi.addFood(item);
			searchResult.showPopover = false;
			searchVal.value = '';
			context.emit('add', String(item.id));
		};

		const customFoodVal = ref('');
		const onAddCustomFood = async () => {
			const { data } = await FoodApi.addFood({ name: customFoodVal.value });
			searchResult.showPopover = false;
			searchVal.value = '';
			context.emit('add', data.id);
			customFoodVal.value = '';
		};

		return {
			imgFoodUrl,
			searchVal,
			handleSearch,
			searchResult,
			onAddFoodToWish,
			customFoodVal,
			onAddCustomFood,
		};
	},
});

function useSearch() {
	const searchResult: searchResultProp = reactive({
		loading: false,
		data: [],
		showPopover: false,
	});
	const searchVal = ref('');
	const handleSearch = debounce(() => {
		const value = searchVal.value.trim();
		if (!value) return;
		searchResult.loading = true;
		searchResult.showPopover = true;
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
			});
	}, 600);

	return {
		searchResult,
		searchVal,
		handleSearch,
	};
}
</script>

<style lang="less">
.food-search {
	.n-input .n-input__suffix {
		cursor: pointer;
		font-size: 22px;
	}
}
.food-search-popover {
	padding: 8px 0 !important;
	.food-search-list {
		padding-bottom: 8px;
		overflow-y: auto;
		max-height: 400px;
	}
	.food-search-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 3px 0;
		padding: 5px 14px;
		cursor: pointer;
		transition: 0.3s;
		&:hover {
			background: rgb(243, 243, 245);
			.r-icon {
				opacity: 1;
			}
		}
		.r-icon {
			opacity: 0;
			transition: 0.2s;
		}
		.content {
			flex: 1;
			padding-left: 10px;
		}
	}
	.n-divider {
		margin: 0;
	}
	.custom-food-wrap {
		padding: 0 14px;
		height: 44px;
		line-height: 44px;
		.n-input {
			width: 300px;
			margin-left: 10px;
		}
	}
	.food-search-item-popover {
		img {
			width: 230px;
		}
	}
}
</style>

