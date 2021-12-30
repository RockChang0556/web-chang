<!--
 * @Author: Rock Chang
 * @Date: 2021-12-30 20:53:39
 * @LastEditTime: 2021-12-30 21:40:59
 * @Description: 
-->
<template>
	<n-drawer-content class="food-detail" :title="data.name">
		<img :src="data.pic" alt="" class="pic" />
		<div class="tag">
			<n-tag v-for="tag in data.tag.split(',')" type="success">
				{{ tag }}
			</n-tag>
		</div>
		<n-grid :cols="3">
			<n-gi>
				<n-statistic label="人数" :value="data.peoplenum" />
			</n-gi>
			<n-gi>
				<n-statistic label="准备时间" :value="data.preparetime" />
			</n-gi>
			<n-gi>
				<n-statistic label="烹饪时间" :value="data.cookingtime" />
			</n-gi>
		</n-grid>
		<n-divider title-placement="left">介绍</n-divider>
		<div class="content" v-html="data.content"></div>
		<n-divider title-placement="left">准备材料</n-divider>
		<n-list bordered class="material">
			<n-list-item v-for="(item, index) in data.material" :key="index">
				{{ item.mname }}: {{ item.amount }}
			</n-list-item>
		</n-list>
		<n-divider title-placement="left">做法</n-divider>
		<n-list class="process">
			<n-list-item v-for="(item, index) in data.process" :key="index">
				<img :src="item.pic" alt="" />
				<div v-html="item.pcontent"></div>
			</n-list-item>
		</n-list>
	</n-drawer-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
	NDrawerContent,
	NDivider,
	NGrid,
	NGi,
	NStatistic,
	NList,
	NListItem,
	NTag,
} from 'naive-ui';
export default defineComponent({
	name: 'food-detail',
	components: {
		NDrawerContent,
		NDivider,
		NGrid,
		NGi,
		NStatistic,
		NList,
		NListItem,
		NTag,
	},
	props: {
		data: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.food-detail {
	.n-statistic-value__content {
		font-size: 18px !important;
	}
	.pic {
		width: 100%;
	}
	.tag {
		.n-tag {
			margin: 0 10px 10px 0;
		}
	}
	.process {
		.n-list-item__main {
			display: flex;
			img {
				margin-right: 10px;
			}
		}
	}
}
</style>

