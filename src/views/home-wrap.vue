<template>
	<div class="home">
		<n-layout position="absolute">
			<n-layout-header bordered>
				<GlobalHeader :user="currentUser"></GlobalHeader>
			</n-layout-header>
			<n-layout-content position="absolute">
				<router-view></router-view>
			</n-layout-content>
		</n-layout>
	</div>
</template>

<script lang="ts" setup name="HomeWrap">
import { computed } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui';
import { useUserStore } from '@/store';
import GlobalHeader from '@/components/layout/header.vue';
const userStore = useUserStore();

const currentUser = computed(() => userStore.userInfo);
</script>

<style lang="less">
.home {
	position: relative;
	.n-layout-header {
		height: 71px;
	}
	> .n-layout {
		min-height: 100vh;
	}
	.n-layout-content {
		top: 71px;
		background-color: #f2f2f2;
	}
}
</style>
