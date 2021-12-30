<!--
 * @Author: Rock Chang
 * @Date: 2021-12-30 18:55:41
 * @LastEditTime: 2021-12-30 21:52:50
 * @Description: 
-->
<template>
	<div class="search">
		<n-input placeholder="输入想吃的, 回车搜索" @keydown.enter="handleSearch">
			<!-- <template #suffix>搜索</template> -->
		</n-input>
		<n-spin :show="searchResult.loading">
			<n-list v-if="searchResult.data.length">
				<n-list-item v-for="v in searchResult.data" :key="v.id">
					<n-thing content-indented>
						<template #avatar>
							<img :src="v.pic" alt="" />
						</template>
						<template #header>{{ v.name }}</template>
						<template #header-extra>
							<n-button text type="info" @click="showDetail(v)">
								查看做法
							</n-button>
						</template>
						<template #description>
							<n-tag v-for="tag in v.tag.split(',')" type="success">
								{{ tag }}
							</n-tag>
						</template>
						<n-ellipsis :line-clamp="5" :tooltip="false">
							<template #tooltip>
								<div v-html="v.content"></div>
							</template>
							{{ v.content }}
						</n-ellipsis>
					</n-thing>
				</n-list-item>
				<template #footer> 加载更多 - todo </template>
			</n-list>
			<n-empty v-else size="huge" description="你什么也找不到"> </n-empty>
		</n-spin>

		<n-drawer v-model:show="detailData.show" :width="502">
			<food-detail :data="detailData.data"></food-detail>
		</n-drawer>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import FoodDetail from './detail.vue';
import {
	NInput,
	NList,
	NListItem,
	NTag,
	NThing,
	NEmpty,
	NEllipsis,
	NSpin,
	NDrawer,
} from 'naive-ui';

export default defineComponent({
	name: 'search',
	components: {
		FoodDetail,
		NInput,
		NList,
		NListItem,
		NTag,
		NThing,
		NEmpty,
		NEllipsis,
		NSpin,
		NDrawer,
	},
	props: {},
	setup() {
		const searchResult: { loading: boolean; data: any[] } = reactive({
			loading: false,
			data: [],
		});
		const handleSearch = (e: any) => {
			searchResult.loading = true;
			axios
				.get('/jdsearch', {
					params: {
						keyword: e.target.value,
						start: 0,
						num: 10,
						appkey: 'a6c59a2ffa28433481c82f3878727a49',
					},
				})
				.then(res => {
					const resl = res.data?.result;
					console.log('resl', resl);
					if (resl?.status === 0) {
						searchResult.data = resl?.result.list;
					} else {
						searchResult.data = [];
					}
				})
				.finally(() => {
					searchResult.loading = false;
				});
		};

		const detailData = reactive({
			show: false,
			data: {},
		});
		const showDetail = (item: any) => {
			detailData.data = item;
			detailData.show = true;
		};
		return { handleSearch, searchResult, detailData, showDetail };
	},
});
</script>

<style lang="less">
.search {
	padding: 0 100px;
	.n-thing-main__description {
		.n-tag {
			margin: 0 10px 10px 0;
		}
	}
	.n-empty {
		padding: 100px 0;
	}
}
</style>
