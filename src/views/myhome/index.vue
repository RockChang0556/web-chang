<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 16:25:28
 * @LastEditTime: 2022-01-09 21:07:38
 * @Description: 首页
-->
<template>
	<div class="home-page">
		<div class="menu-pic">
			<img
				alt="么么么哒"
				src="https://s2.loli.net/2022/01/04/7Ss8G6CEYgVF3Xn.png"
			/>
			<p v-if="enterFood.show">
				今天吃 <span>{{ enterFood.data.name }}</span> !!!
			</p>
		</div>
		<!-- <search></search>
				<com-upload-img></com-upload-img> -->
		<div class="random-btn-wrap">
			<p>
				<n-button class="random-btn" round type="success" @click="onRandom">
					开始随机 ({{ selected.foods.length }})
				</n-button>
			</p>
			<p class="random-list">
				随机范围:
				<span class="random-list-wish">
					<n-tag v-for="v in selected.wishs" :key="v.id" round>
						{{ v.name }}
					</n-tag>
				</span>
				<r-icon name="bianji" @click="isShowWish = true"></r-icon>
			</p>
			<router-link :to="{ name: 'mywish' }">我的心愿单</router-link>
		</div>
		<n-drawer v-model:show="isShowWish" display-directive="show" :width="402">
			<choose-random
				:show="isShowWish"
				:wishs="selected.wishs"
				@choose="onChooseWish"
			></choose-random>
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

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { NDrawer, NTag, NModal, NCard } from 'naive-ui';
import ChooseRandom from './choose-random.vue';
import { randomNum } from '@/utils/util';
import { FoodApi } from '@/services';

export default defineComponent({
	name: 'home-page',
	components: { NTag, NDrawer, NModal, NCard, ChooseRandom },
	props: {},
	setup() {
		const isShowWish = ref(false);
		// 已确认的菜品
		const enterFood: { data: any; show: boolean } = reactive({
			data: {},
			show: false,
		});
		// 抽中的菜品
		const luckFood: { data: any; showModal: boolean } = reactive({
			data: {},
			showModal: false,
		});
		const selected: { wishs: any[]; foods: string[] } = reactive({
			wishs: [],
			foods: [],
		});

		// 选择随机源 - 确认
		const onChooseWish = (wishs: any[], foods: string[]) => {
			isShowWish.value = false;
			selected.wishs = wishs;
			selected.foods = foods;
		};

		// 开始随机菜品
		const onRandom = async () => {
			if (!selected.foods.length) {
				window.$message.error('您还没有选择心愿单或心愿单内没有菜品');
				return;
			}
			const index = randomNum(0, selected.foods.length - 1);
			const foodId = selected.foods[index];
			const { data } = await FoodApi.getFoodDetail({ foodid: foodId });
			luckFood.showModal = true;
			luckFood.data = data;
		};

		// 确定今天吃的菜品
		const onSeclect = () => {
			luckFood.showModal = false;
			enterFood.data = JSON.parse(JSON.stringify(luckFood.data));
			enterFood.show = true;
		};
		return {
			isShowWish,
			selected,
			onChooseWish,
			onRandom,
			onSeclect,
			luckFood,
			enterFood,
		};
	},
});
</script>

<style lang="less">
.home-page {
	height: 100%;
	.menu-pic {
		position: relative;
		> p {
			position: absolute;
			width: 100%;
			text-align: center;
			font-size: 30px;
			bottom: 95px;
			span {
				color: #18a058;
			}
		}
	}
	.random-btn-wrap {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 50%;
		.random-list {
			margin: 10px 0;
			> span {
				margin-right: 5px;
			}
			.r-icon {
				cursor: pointer;
				font-size: 20px;
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
