<!--
 * @Author: Rock Chang
 * @Date: 2022-01-24 16:55:42
 * @LastEditTime: 2022-02-08 15:39:06
 * @Description: 菜品
-->
<template>
	<div class="food-detail-page">
		<div class="handle-btns">
			<n-badge class="btn like-btn" :value="likeData.like_nums" color="grey">
				<n-button
					secondary
					:class="{ islike: likeData.islike }"
					:type="likeData.islike ? 'success' : 'tertiary'"
					circle
					@click="onChangeLike"
				>
					<transition :name="likeData.islike ? 'likezoom' : ''" mode="out-in">
						<r-icon v-if="likeData.islike" name="dianzan"></r-icon>
						<r-icon v-else name="line_zan"></r-icon>
					</transition>
				</n-button>
			</n-badge>
		</div>
		<n-spin :show="foodDetail.loading">
			<div class="detail-content" v-if="!foodDetail.loading">
				<h1>{{ foodDetail.data.name }}</h1>
				<div class="creator">
					<Avatar :src="foodDetail.data.creator?.avatar_url"></Avatar>
					<div class="creator-info">
						<p class="name">{{ foodDetail.data.creator.name }}</p>
						<p class="time">
							创建于
							<n-time :time="new Date(foodDetail.data.created_at || '')" />
						</p>
					</div>
				</div>
				<n-image
					class="pic"
					:src="foodDetail.data.pic"
					:fallback-src="imgFoodUrl"
				></n-image>
				<div class="tag">
					<n-tag
						v-if="foodDetail.data.tag?.length"
						v-for="tag in foodDetail.data.tag"
						type="success"
					>
						{{ tag }}
					</n-tag>
				</div>
				<n-grid :cols="2">
					<n-gi>
						<n-statistic label="人数" :value="foodDetail.data.peoplenum" />
					</n-gi>
					<n-gi>
						<n-statistic
							label="烹饪时间"
							:value="foodDetail.data.cookingtime"
						/>
					</n-gi>
				</n-grid>
				<n-divider title-placement="left">介绍</n-divider>
				<div class="content" v-html="foodDetail.data.content"></div>
				<n-divider title-placement="left">准备材料</n-divider>
				<n-list bordered class="material">
					<n-list-item
						v-for="(item, index) in foodDetail.data.material"
						:key="index"
					>
						{{ item.mname }}: {{ item.amount }}
					</n-list-item>
				</n-list>
				<n-divider title-placement="left">做法</n-divider>
				<n-list class="process">
					<n-list-item
						v-for="(item, index) in foodDetail.data.process"
						:key="index"
					>
						<template #suffix>
							<img :src="item.pic" alt="" />
						</template>
						<div v-html="item.pcontent"></div>
					</n-list-item>
				</n-list>
			</div>
		</n-spin>
	</div>
</template>

<script lang="ts" setup name="FoodDetail">
import { onMounted, reactive } from 'vue';
import {
	NBadge,
	NDivider,
	NGrid,
	NGi,
	NStatistic,
	NList,
	NListItem,
	NTag,
	NTime,
} from 'naive-ui';
import { FoodApi } from '@/services';
import Avatar from '@/components/avatar.vue';
import { imgFoodUrl } from '@/constants/index';
const props = defineProps({
	// params参数
	foodid: {
		type: String,
	},
});
const { foodDetail, getFoodData } = useFoodData();
const { likeData, getLikes, onChangeLike } = useFoodLikes();

onMounted(() => {
	getFoodData();
	// 获取菜品点赞情况
	getLikes();
});

// 菜品详情
function useFoodData() {
	const foodDetail: { loading: boolean; data: any } = reactive({
		loading: false,
		data: null,
	});
	// 获取菜品详情
	const getFoodData = async () => {
		try {
			foodDetail.loading = true;
			const { data } = await FoodApi.getFoodDetail({ foodid: props.foodid });
			foodDetail.data = data;
		} finally {
			foodDetail.loading = false;
		}
	};
	return {
		foodDetail,
		getFoodData,
	};
}
// 菜品点赞情况
function useFoodLikes() {
	const likeData: { islike: boolean; like_nums: number } = reactive({
		islike: false,
		like_nums: 0,
	});
	const getLikes = async () => {
		const { data } = await FoodApi.getFoodLikes({ foodid: props.foodid });
		likeData.islike = data.islike;
		likeData.like_nums = data.like_nums;
	};
	const onChangeLike = async () => {
		await FoodApi.updateFoodLikes(
			{ foodid: props.foodid },
			{ type: likeData.islike ? 'dislike' : 'like' }
		);
		likeData.like_nums += likeData.islike ? -1 : 1;
		likeData.islike = !likeData.islike;
	};
	return {
		likeData,
		getLikes,
		onChangeLike,
	};
}
</script>

<style lang="less">
.food-detail-page {
	width: 800px;
	margin: 20px auto;
	padding: 20px;
	position: relative;
	background-color: var(--base-color);
	.handle-btns {
		position: absolute;
		left: -80px;
		display: flex;
		flex-direction: column;
		.btn {
			margin: 10px 0;
		}
		.like-btn {
			.n-button {
				width: 50px;
				height: 50px;
				// &.islike .r-icon {
				// 	color: var(--primary-color);
				// }
				& .r-icon {
					font-size: 18px;
				}
			}
		}
	}
	.detail-content {
		.creator {
			display: flex;
			padding: 10px 0;
			.com-avatar {
				flex-shrink: 0;
				width: 44px;
				height: 44px;
			}
			.creator-info {
				margin-left: 10px;
				.name {
					color: var(--text-color-2);
				}
				.time {
					color: #8a919f;
				}
			}
		}
		.pic {
			width: 50%;
			text-align: center;
			> img {
				width: 100%;
			}
		}
		.tag {
			.n-tag {
				margin: 0 10px 10px 0;
			}
		}
	}
}
</style>
