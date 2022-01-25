<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 16:14:39
 * @LastEditTime: 2022-01-25 22:02:10
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
				<template #header-extra>
					<slot name="handle">
						<n-button text type="error" @click="onDelete(item.id)">
							删除
						</n-button>
					</slot>
				</template>
				<template #description>
					<template v-if="item.tag?.length" v-for="(tag, i) in item.tag">
						<n-tag type="success" v-if="i < 6"> {{ tag }} </n-tag>
					</template>
				</template>
				<n-ellipsis :line-clamp="2" :tooltip="false">
					<div v-html="item.content"></div>
				</n-ellipsis>
			</n-thing>
		</n-list-item>
	</div>
</template>

<script lang="ts" setup name="WishFoodListItem">
import { PropType } from 'vue';
import { NListItem, NTag, NThing, NEllipsis } from 'naive-ui';
import { imgFoodUrl, imgFood404Url } from '@/constants';
defineProps({
	item: {
		type: Object as PropType<any>,
		require: true,
	},
});
const emits = defineEmits<{
	(e: 'delete', value: string): void;
}>();

const onDelete = (id: string) => {
	emits('delete', id);
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
		background: #f2f2f2;
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
	}
}
</style>
