<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 16:25:28
 * @LastEditTime: 2022-01-26 22:16:29
 * @Description: 首页
-->
<template>
	<div class="home-page">
		<div class="menu-pic">
			<img
				alt="么么么哒"
				src="https://s2.loli.net/2022/01/22/75D1G2EMlZSuWxN.jpg"
			/>
			<p v-if="luckFood.show">
				今天吃 <span>{{ luckFood.data.name }}</span> !!!
			</p>
		</div>

		<div class="random-btn-wrap">
			<p>
				<n-button
					class="random-btn"
					round
					type="success"
					@click="onRandom"
					:loading="randomAllList.loading"
				>
					开始随机
				</n-button>
			</p>
			<p class="random-list">
				随机范围:
				<span class="random-list-wish">
					<n-tag round v-if="randomRang.type === 'all'"> 全部 </n-tag>
					<n-tag round v-else v-for="v in randomRang.wishs" :key="v.id">
						<r-icon name="heart-filled"></r-icon>
						{{ v.name }}
					</n-tag>
				</span>
				<r-icon name="bianji" @click="isShowWish = true"></r-icon>
			</p>
		</div>
		<n-drawer v-model:show="isShowWish" display-directive="show" :width="402">
			<ChooseRandom :show="isShowWish" @choose="onChangeRang"></ChooseRandom>
		</n-drawer>
		<n-modal
			v-model:show="luckFood.showModal"
			:mask-closable="false"
			transform-origin="center"
			class="luck-food-model"
		>
			<div class="luck-food-model-content">
				<n-card
					style="width: 520px"
					:title="`喔, 你选中了 ${luckFood.data.name}`"
					:bordered="false"
					size="huge"
				>
					<img :src="luckFood.data.pic" alt="" srcset="" />
				</n-card>
				<div class="btns">
					<n-button type="warning" round @click="onRandom">换一个</n-button>
					<n-button type="success" round @click="onSeclect">就这个了</n-button>
				</div>
			</div>
		</n-modal>
	</div>
</template>

<script lang="ts" setup name="Home">
import { reactive, ref } from 'vue';
import { NDrawer, NTag, NModal, NCard } from 'naive-ui';
import { randomNum } from '@/utils/util';
import { FoodApi } from '@/services';
import ChooseRandom from './choose-random.vue';

interface rangProp {
	type: string;
	foods: string[];
	wishs: any[];
}
// 抽中的菜品
const luckFood: { data: any; showModal: boolean; show: boolean } = reactive({
	data: {},
	showModal: false,
	show: false,
});

// 随机范围数据
const { isShowWish, randomRang, onChangeRang } = useRandomRang();

// 开始随机菜品
const onRandom = async () => {
	if (!randomRang.foods.length && randomRang.type === 'wish') {
		window.$message.error('您还没有选择心愿单或心愿单内没有菜品');
		return;
	}
	const randList =
		randomRang.type === 'all' ? randomAllList.list : randomRang.foods;
	const index = randomNum(0, randList.length - 1);
	const foodId = randList[index];
	const { data } = await FoodApi.getFoodDetail({ foodid: foodId });
	luckFood.showModal = true;
	luckFood.data = data;
};

// 确定今天吃的菜品
const onSeclect = () => {
	luckFood.showModal = false;
	luckFood.show = true;
};

// 全部随机
const { randomAllList, getAllFood } = useRandomAll();

getAllFood();

function useRandomRang() {
	const isShowWish = ref(false);
	const randomRang: rangProp = reactive({
		type: 'all',
		foods: [],
		wishs: [],
	});
	// 选择随机源 - 确认
	const onChangeRang = (
		type: string,
		data: { foods?: string[]; wishs?: any[] } = {}
	) => {
		isShowWish.value = false;
		randomRang.type = type;
		randomRang.foods = data.foods || [];
		randomRang.wishs = data.wishs || [];
	};
	return {
		isShowWish,
		randomRang,
		onChangeRang,
	};
}
function useRandomAll() {
	const randomAllList = reactive({
		list: [],
		loading: false,
	});
	const getAllFood = async () => {
		try {
			randomAllList.loading = true;
			const { data } = await FoodApi.getRandomFoods({ limit: 100 });
			const list = data.map((v: { id: string; name: string }) => v.id);
			randomAllList.list = list || [];
		} finally {
			randomAllList.loading = false;
		}
	};
	return { randomAllList, getAllFood };
}
</script>

<style lang="less">
.home-page {
	height: 100%;
	.menu-pic {
		position: relative;
		text-align: center;
		img {
			width: 800px;
		}
		> p {
			position: absolute;
			width: 100%;
			text-align: center;
			font-size: 30px;
			bottom: 95px;
			span {
				color: var(--primary-color);
			}
		}
	}
	.random-btn-wrap {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 50%;
		.random-list {
			margin: 10px auto;
			line-height: 28px;
			> span {
				margin: 0 3px;
			}
			.r-icon {
				cursor: pointer;
				font-size: 20px;
			}
			.random-list-wish {
				.n-tag {
					margin-right: 5px;
				}
			}
		}
		.random-btn {
			width: 200px;
			height: 50px;
		}
	}
}
.luck-food-model {
	box-shadow: none;
	.n-card-header .n-card-header__main {
		text-align: center;
	}
	.n-card__content {
		> img {
			width: 100%;
		}
	}
	.btns {
		margin-top: 20px;
		text-align: center;
		.n-button {
			margin: 0 10px;
		}
	}
}
</style>
