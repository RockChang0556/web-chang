<!--
 * @Author: Rock Chang
 * @Date: 2022-01-09 18:27:06
 * @LastEditTime: 2022-01-09 21:10:10
 * @Description: 首页 - 选择随机范围
-->
<template>
	<n-drawer-content class="home-choose-random">
		<template #header>已选择 {{ selectedWish.length }} 个心愿单</template>
		<div class="wish-list">
			<n-checkbox-group v-model:value="selectedWish">
				<div class="wish-list-item" v-for="v in wishsData.data" :key="v.id">
					<n-checkbox :value="v.id" />
					<div class="item-content">
						<h3 class="item-content-title">
							<router-link :to="{ name: 'editwish', params: { wishid: v.id } }">
								{{ v.name }}
							</router-link>
							<span>
								{{ v.food_list ? v.food_list.split(',').length : 0 }} 篇菜品
							</span>
						</h3>
						<n-tag v-if="v.tag.length" v-for="tag in v.tag" type="success">
							{{ tag }}
						</n-tag>
					</div>
				</div>
			</n-checkbox-group>
		</div>
		<template #footer>
			<n-button @click="onSelect">确认</n-button>
		</template>
	</n-drawer-content>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { NDrawerContent, NTag, NCheckboxGroup, NCheckbox } from 'naive-ui';
import { pagesProp } from '@/types/types';
import { WishApi } from '@/services';

interface wishDataProp {
	loading: boolean;
	data: any[];
}
export default defineComponent({
	name: 'defaults',
	components: { NCheckboxGroup, NCheckbox, NDrawerContent, NTag },
	props: {
		show: {
			type: Boolean,
		},
		wishs: {
			type: Array,
		},
	},
	setup(props, context) {
		// 心愿单列表数据
		const wishsData: wishDataProp = reactive({
			loading: false,
			data: [],
		});

		// 查询参数 - 分页
		const pageParams: pagesProp = reactive({
			page_index: 1,
			page_size: 10,
		});
		// 请求接口
		const getMyWishs = async () => {
			try {
				wishsData.loading = true;
				const { data } = await WishApi.getMyWishs({
					pages: pageParams,
					orders: { updated_at: 'desc' },
				});
				wishsData.data = data.rows;
			} finally {
				wishsData.loading = false;
			}
		};
		getMyWishs();

		// 已选择的心愿单
		const selectedWish: any = ref([]);
		const onSelect = () => {
			const foods: string[] = [];
			const wishs: any[] = [];
			wishsData.data.forEach(v => {
				if (selectedWish.value.includes(v.id)) {
					const ids = v.food_list ? v.food_list.split(',') : [];
					foods.push(...ids);
					wishs.push({
						id: v.id,
						name: v.name,
					});
				}
			});
			context.emit('choose', wishs, foods);
		};

		watch(
			() => props.show,
			(val: boolean) => {
				if (val) {
					selectedWish.value = props.wishs?.map((v: any) => v.id);
				}
			}
		);
		return {
			wishsData,
			selectedWish,
			onSelect,
		};
	},
});
</script>

<style lang="less">
.home-choose-random {
	.n-drawer-body-content-wrapper {
		padding: 0 !important;
	}
	.wish-list-item {
		padding: 5px 14px;
		margin: 5px 0 0;
		height: 70px;
		transition: 0.3s;
		display: flex;
		&:hover {
			background: #ccc;
		}
		.item-content {
			padding-left: 10px;
			flex: 1;
			.item-content-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				> a {
					max-width: calc(100% - 60px);
					color: #666;
					&:hover {
						color: #18a058;
					}
				}
				> span {
					flex-shrink: 0;
					font-size: 12px;
					color: #999;
				}
			}
		}
		.n-tag {
			margin: 0 5px 5px 0;
		}
	}
}
</style>

