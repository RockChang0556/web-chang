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

<script lang="ts" setup>
import { computed } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui';
import GlobalHeader from '@/components/layout/header.vue';
import { useStore } from 'vuex';

const store = useStore();
const currentUser = computed(() => store.state.user.userInfo);
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
	}
}
</style>
