<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 16:14:39
 * @LastEditTime: 2022-01-12 20:03:13
 * @Description: 菜品卡片
-->
<template>
	<div class="wish-food-list-item">
		<n-list-item>
			<n-thing content-indented>
				<template #avatar>
					<img :src="item.pic" alt="" />
				</template>
				<template #header>{{ item.name }}</template>
				<template #header-extra>
					<n-button text type="error" @click="onDelete(item.id)">
						从心愿单删除
					</n-button>
				</template>
				<template #description>
					<template v-if="item.tag.length" v-for="(tag, i) in item.tag">
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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NListItem, NTag, NThing, NEllipsis } from 'naive-ui';
export default defineComponent({
	name: 'wish-food-list-item',
	components: { NListItem, NTag, NThing, NEllipsis },
	props: {
		item: {
			type: Object as PropType<any>,
			require: true,
		},
	},
	setup(props, context) {
		const onDelete = (id: string) => {
			context.emit('delete', id);
		};
		return { onDelete };
	},
});
</script>

<style lang="less">
.wish-food-list-item {
	.n-list-item {
		padding: 8px;
	}
	.n-thing-avatar img {
		width: 120px;
	}
	.n-thing-main__description {
		.n-tag {
			margin: 0 10px 10px 0;
		}
	}
}
</style>

