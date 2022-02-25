<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 16:14:39
 * @LastEditTime: 2022-02-25 17:10:45
 * @Description: 菜品卡片
-->
<template>
	<div class="wish-food-list-item">
		<n-list-item>
			<n-thing content-indented>
				<template #avatar>
					<n-image
						:src="item.deleted ? imgFood404Url : item.pic || 'e'"
						:fallback-src="imgFoodUrl"
					></n-image>
				</template>
				<template #header>
					<router-link
						:to="{ name: 'food-detail', params: { foodid: item.id } }"
					>
						<n-button text>{{ item.name }}</n-button>
					</router-link>
				</template>
				<template #description>
					<template v-if="item.tag?.length" v-for="(tag, i) in item.tag">
						<n-tag type="success" v-if="i < 6"> {{ tag }} </n-tag>
					</template>
				</template>
				<n-ellipsis :line-clamp="1" :tooltip="false">
					<div v-html="item.content"></div>
				</n-ellipsis>
				<template #footer>
					<span
						class="like"
						:class="{ islike: item.islike }"
						@click="onChangeLike(item)"
					>
						<transition :name="item.islike ? 'likezoom' : ''" mode="out-in">
							<r-icon v-if="item.islike" name="dianzan"></r-icon>
							<r-icon v-else name="line_zan"></r-icon>
						</transition>
						<n-badge v-if="item.favs" :value="item.favs" :max="15" />
						<span v-else>点赞</span>
					</span>
					<slot name="handle"></slot>
				</template>
			</n-thing>
		</n-list-item>
	</div>
</template>

<script lang="ts" setup name="WishFoodListItem">
import { PropType } from 'vue';
import { imgFoodUrl, imgFood404Url } from '@/constants';
import { FoodApi } from '@/services';
defineProps({
	item: {
		type: Object as PropType<any>,
		require: true,
	},
});

const onChangeLike = async (item: any) => {
	await FoodApi.updateFoodLikes(
		{ foodid: item.id },
		{ type: item.islike ? 'dislike' : 'like' }
	);
	item.favs += item.islike ? -1 : 1;
	item.islike = !item.islike;
};
</script>

<style lang="less">
.wish-food-list-item {
	.n-list-item {
		padding: 8px;
	}
	.n-thing-header__title {
		.n-button {
			font-size: 16px;
			font-weight: 600;
		}
	}
	.n-thing-avatar {
		background: var(--button-color-2);
		width: 120px;
		height: 120px;
		line-height: 120px;
		border-radius: 6px;
		overflow: hidden;
		flex-shrink: 0;
		.n-image {
			vertical-align: middle;
			img {
				width: 120px;
			}
		}
	}
	.n-thing-main {
		padding: 5px 0;
		height: 120px;
		.n-thing-main__description {
			.n-tag {
				margin: 0 10px 0 0;
			}
		}
		.n-thing-main__content {
			margin-top: 6px !important;
		}
		.n-thing-main__footer {
			margin-top: 0 !important;
			display: flex;
			align-items: center;
			.r-icon {
				font-size: 20px;
				padding: 3px;
				margin-right: 5px;
				transition: 0.3s;
			}
			> span,
			> button {
				display: flex;
				align-items: center;
				margin-right: 20px;
				width: 60px;
				cursor: pointer;
				&:hover {
					.n-badge-sup,
					span,
					.r-icon {
						color: var(--primary-color);
					}
				}
				> span {
					margin-top: 2px;
					font-size: 12px;
					transition: 0.3s;
				}
			}
			.like {
				&.islike,
				& .n-badge-sup {
					color: var(--primary-color);
				}
				.n-badge-sup {
					padding: 0;
					.n-base-slot-machine {
						height: 20px;
						line-height: 20px;
					}
					background: transparent;
				}
			}
			.delete {
				&:hover {
					.n-badge-sup,
					span,
					.r-icon {
						color: var(--error-color);
					}
				}
			}
		}
	}
}
</style>
