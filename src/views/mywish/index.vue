<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 16:12:56
 * @LastEditTime: 2022-01-12 20:08:55
 * @Description:  我的心愿单-首页
-->
<template>
	<div class="mywish-page">
		<n-breadcrumb separator=">">
			<n-breadcrumb-item>
				<router-link :to="{ name: 'home' }"> 首页 </router-link>
			</n-breadcrumb-item>
			<n-breadcrumb-item>我的心愿单 </n-breadcrumb-item>
		</n-breadcrumb>
		<div class="search-wrap">
			<router-link :to="{ name: 'addwish' }">
				<n-button type="primary" ghost>新建心愿单</n-button>
			</router-link>
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
							<template #header>
								<router-link
									class="title"
									:to="{ name: 'editwish', params: { wishid: v.id } }"
								>
									{{ v.name }}
								</router-link>
							</template>
							<template #header-extra>
								{{ v.food_list ? v.food_list.split(',').length : 0 }} 篇菜品
								<n-popconfirm @positive-click="onDeleteWish(v.id)">
									<template #trigger>
										<n-button text type="error"> 删除 </n-button>
									</template>
									确定要删除此心愿单吗
								</n-popconfirm>
							</template>
							<template #description> {{ v.summary || '暂无描述' }} </template>
							<n-tag v-if="v.tag.length" v-for="tag in v.tag" type="success">
								{{ tag }}
							</n-tag>
						</n-thing>
					</n-list-item>
					<template #footer>
						<n-pagination
							v-model:page="pageParams.page_index"
							:page-size="pageParams.page_size"
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
import {
	NList,
	NListItem,
	NThing,
	NTag,
	NPagination,
	NPopconfirm,
	NBreadcrumb,
	NBreadcrumbItem,
} from 'naive-ui';
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
	components: {
		NList,
		NListItem,
		NThing,
		NTag,
		NPagination,
		NPopconfirm,
		NBreadcrumb,
		NBreadcrumbItem,
	},
	props: {},
	setup() {
		// 查询参数 - 分页
		const pageParams: pagesProp = reactive({
			page_index: 1,
			page_size: 5,
		});
		// 查询参数 - 模糊查询
		const queryParams: querysProp = reactive({
			name: '',
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
					orders: { updated_at: 'desc' },
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

		// 删除心愿单
		const onDeleteWish = async (id: string) => {
			await WishApi.deleteWish({ wishid: id });
			window.$message.success('删除成功');
			await getMyWishs();
		};

		getMyWishs(true);
		return { handleSearch, pageParams, wishsData, changePage, onDeleteWish };
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
		padding: 20px 10px;
		display: flex;
		justify-content: space-between;
		.n-input {
			width: 300px;
		}
	}
	.wish-wrap {
		padding: 20px 0;
	}
	.wish-list-item {
		height: 127px;
		align-items: start;
		.title {
			color: #666;
			&:hover {
				color: #36ad6a;
			}
		}
		.n-tag {
			margin: 0 10px 10px 0;
		}
	}
}
</style>

