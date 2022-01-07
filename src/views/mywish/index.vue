<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 16:12:56
 * @LastEditTime: 2022-01-07 20:27:57
 * @Description:  我的心愿单-首页
-->
<template>
	<div class="mywish-page">
		<!-- <h2>我的心愿单</h2> -->
		<div class="search-wrap clearfix">
			<n-input placeholder="回车搜索我的心愿单" @keydown.enter="handleSearch">
			</n-input>
		</div>
		<div class="wish-wrap">
			<n-spin :show="wishsData.loading">
				<n-list v-if="wishsData.data.length">
					<n-list-item
						v-for="v in wishsData.data"
						:key="v.id"
						class="wish-list-item"
					>
						<n-thing content-indented>
							<template #avatar>
								<img :src="v.pic" alt="" />
							</template>
							<template #header>{{ v.name }}</template>
							<template #header-extra>
								<n-button text type="info"> 查看做法 </n-button>
							</template>
							<template #description> {{ v.summary }} </template>
							<n-tag v-for="tag in v.tag.split(',')" type="success">
								{{ tag }}
							</n-tag>
						</n-thing>
					</n-list-item>
					<template #footer>
						<n-pagination
							v-model:page="pageParams.page_index"
							:item-count="wishsData.total"
							@update:page="changePage"
						/>
					</template>
				</n-list>
				<n-empty v-else-if="wishsData.first" size="huge">
					你还没有心愿单哦,
					<router-link :to="{ name: 'addwish' }">
						<n-button text type="primary">新建</n-button>
					</router-link>
					一个吧
				</n-empty>
				<n-empty v-else size="huge" description="你什么也找不到"> </n-empty>
			</n-spin>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import debounce from 'lodash/debounce';
import { NList, NListItem, NThing, NTag, NEmpty, NPagination } from 'naive-ui';
import { WishApi } from '@/services';
import { pagesProp, querysProp } from '@/types/types';

interface wishDataProp {
	loading: boolean;
	data: any[];
	total: number;
	first: boolean;
}
export default defineComponent({
	name: 'mywish-page',
	components: { NList, NListItem, NThing, NTag, NEmpty, NPagination },
	props: {},
	setup() {
		// 查询参数 - 分页
		const pageParams: pagesProp = reactive({
			page_index: 1,
			page_size: 10,
		});
		// 查询参数 - 模糊查询
		const queryParams: querysProp = reactive({
			name: '1',
		});
		// 心愿单列表数据
		const wishsData: wishDataProp = reactive({
			loading: false,
			data: [],
			total: 0,
			first: true,
		});

		// 模糊搜索
		const handleSearch = debounce((e: Event) => {
			const val = (e.target as HTMLInputElement).value;
			queryParams.name = val;
			getMyWishs();
		}, 600);

		// 当前页改变
		const changePage = (page: number) => {
			pageParams.page_index = page;
			getMyWishs();
		};

		// 请求接口
		const getMyWishs = async (first = false) => {
			const errHandle = () => {
				wishsData.data = [];
				wishsData.total = 0;
				window.$message.error('搜索出错, 请稍后再试');
			};
			try {
				wishsData.loading = true;
				const { data } = await WishApi.getMyWishs({
					pages: pageParams,
					querys: queryParams,
				});
				if (!first) wishsData.first = false;
				if (data) {
					wishsData.data = data.rows;
					wishsData.total = data.count;
				} else {
					errHandle();
				}
			} catch (error) {
				errHandle();
			} finally {
				wishsData.loading = false;
			}
		};

		getMyWishs(true);
		return { handleSearch, pageParams, wishsData, changePage };
	},
});
</script>

<style lang="less">
.mywish-page {
	width: 800px;
	height: 100%;
	margin: 0 auto;
	padding: 20px 0;
	.search-wrap {
		.n-input {
			width: 300px;
			float: right;
		}
	}
	.wish-wrap {
		padding: 20px;
	}
	.wish-list-item {
		.n-tag {
			margin: 0 10px 10px 0;
		}
	}
}
</style>

