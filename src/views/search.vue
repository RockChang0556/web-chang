<!--
 * @Author: Rock Chang
 * @Date: 2021-12-30 18:55:41
 * @LastEditTime: 2021-12-30 20:16:58
 * @Description: 
-->
<template>
	<div class="search">
		<n-input placeholder="输入想吃的, 回车搜索" @keydown.enter="handleSearch">
			<!-- <template #suffix>搜索</template> -->
		</n-input>
		<n-list v-if="searchResult.data.length">
			<n-list-item v-for="v in searchResult.data" :key="v.id">
				<n-thing content-indented>
					<template #avatar>
						<img :src="v.pic" alt="" />
					</template>
					<template #header>{{ v.name }}</template>
					<template #description>
						<n-tag v-for="tag in v.tag.split(',')" type="success">
							{{ tag }}
						</n-tag>
					</template>
					{{ v.content }}
				</n-thing>
			</n-list-item>
			<template #footer> 加载更多 - todo </template>
		</n-list>
		<n-empty v-else size="huge" description="你什么也找不到"> </n-empty>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import { NInput, NList, NListItem, NTag, NThing, NEmpty } from 'naive-ui';

export default defineComponent({
	name: 'search',
	components: { NInput, NList, NListItem, NTag, NThing, NEmpty },
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
					const resl = res.data.result;
					if (resl.status === 0) {
						searchResult.data = resl?.result.list;
					} else {
						searchResult.data = [];
					}
				})
				.finally(() => {
					searchResult.loading = false;
				});
		};
		return { handleSearch, searchResult };
	},
});
</script>

<style lang="less">
.search {
	padding: 0 100px;
	.n-thing-main__description {
		.n-tag {
			margin-right: 10px;
		}
	}
	> .n-empty {
		padding: 100px 0;
	}
}
</style>
