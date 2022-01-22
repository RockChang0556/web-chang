<!--
 * @Author: Rock Chang
 * @Date: 2022-01-09 18:27:06
 * @LastEditTime: 2022-01-22 14:24:04
 * @Description: 首页 - 选择随机范围
-->
<template>
	<n-drawer-content class="home-choose-random">
		<template #header>选择随机范围</template>
		<n-radio-group
			v-model:value="randVal"
			name="radiobuttongroup1"
			@update:value="onChangeRandVal"
		>
			<n-radio-button v-for="v in randOptions" :key="v.value" :value="v.value">
				{{ v.label }}
			</n-radio-button>
		</n-radio-group>
		<div class="is-wish" v-show="randVal === 'wish'">
			<template v-if="userId">
				<p>已选择 {{ selectedWish.length }} 个心愿单</p>
				<div class="wish-list">
					<n-checkbox-group v-model:value="selectedWish">
						<div class="wish-list-item" v-for="v in wishsData.data" :key="v.id">
							<n-checkbox :value="v.id" />
							<div class="item-content">
								<h3 class="item-content-title">
									<router-link
										target="_blank"
										tag="a"
										:to="{ name: 'editwish', params: { wishid: v.id } }"
									>
										{{ v.name }}
									</router-link>
									<span> {{ v.food_list?.length || 0 }} 篇菜品 </span>
								</h3>
								<n-tag v-if="v.tag.length" v-for="tag in v.tag" type="success">
									{{ tag }}
								</n-tag>
							</div>
						</div>
					</n-checkbox-group>
				</div>
			</template>
			<template v-else>
				<p>
					您还没有登陆哦, 无法查看心愿单。
					<a :href="loginUrl">
						<n-button type="danger">去登录</n-button>
					</a>
				</p>
			</template>
		</div>
		<div class="is-all" v-show="randVal === 'all'">全部菜品</div>
	</n-drawer-content>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import {
	NDrawerContent,
	NTag,
	NCheckboxGroup,
	NCheckbox,
	NRadioGroup,
	NRadioButton,
} from 'naive-ui';
import { pagesProp } from '@/types/types';
import { WishApi } from '@/services';
import { loginUrl } from '@/config/constants';

interface wishDataProp {
	loading: boolean;
	data: any[];
}

const props = defineProps({
	show: {
		type: Boolean,
	},
});
const emits = defineEmits<{
	(e: 'choose', type: string, data?: any): void;
}>();

const store = useStore();
const userId = computed(() => store.state.user.userInfo.id);
// 查询参数 - 分页
const pageParams: pagesProp = reactive({
	page_index: 1,
	page_size: 10,
});
// 心愿单列表数据
const wishsData: wishDataProp = reactive({
	loading: false,
	data: [],
});
// 已选择的心愿单
const selectedWish: any = ref([]);

const { randVal, randOptions, onChangeRandVal } = useRandOpt(selectedWish);
// 请求接口, 获取我的心愿单
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

watch(() => props.show, watchShow);

const created = () => {
	if (localStorage.getItem('access_token')) {
		getMyWishs();
	}
};
created();

function watchShow(val: boolean) {
	if (val) return;
	if (randVal.value === 'wish') {
		const foods: string[] = [];
		const wishs: any[] = [];
		wishsData.data.forEach((v) => {
			if (selectedWish.value.includes(v.id)) {
				const ids = v.food_list.map((v: any) => v.id);
				foods.push(...ids);
				wishs.push({
					id: v.id,
					name: v.name,
				});
			}
		});
		emits('choose', randVal.value, { foods, wishs });
	} else {
		emits('choose', randVal.value);
	}
}
function useRandOpt(selectedWish: any) {
	const randOptions = [
		{ label: '全部', value: 'all' },
		{ label: '我的心愿单', value: 'wish' },
	];
	const randVal = ref('all');
	const onChangeRandVal = (val: string) => {
		if (val === 'wish') {
			selectedWish.value = [];
		}
	};
	return { randVal, randOptions, onChangeRandVal };
}
</script>

<style lang="less">
.home-choose-random {
	.is-wish {
		> p {
			padding: 5px 14px;
		}
	}
	.is-all {
		padding: 5px 14px;
	}
	.n-drawer-body-content-wrapper {
		padding: 0 !important;
		.n-radio-group {
			width: 100%;
			padding: 10px 14px;
			height: 55px;
			.n-radio-button {
				width: 50%;
				text-align: center;
			}
		}
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
