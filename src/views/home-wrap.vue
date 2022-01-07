<template>
	<div class="home">
		<n-layout position="absolute">
			<n-layout-header bordered>
				<global-header :user="currentUser"></global-header>
			</n-layout-header>
			<n-layout-content position="absolute">
				<router-view></router-view>
			</n-layout-content>
		</n-layout>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui';
import GlobalHeader from '@/components/layout/header.vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: 'home',
	components: {
		GlobalHeader,
		NLayout,
		NLayoutHeader,
		NLayoutContent,
	},
	props: {},
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.state.user.userInfo);
		return {
			currentUser,
		};
	},
});
</script>

<style lang="less">
.home {
	position: relative;
	.menu-pic {
		text-align: center;
		img {
			width: 800px;
		}
	}
	> .n-layout {
		min-height: 100vh;
	}
	.n-layout-content {
		top: 71px;
	}
}
</style>
