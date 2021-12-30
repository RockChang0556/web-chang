<template>
	<div class="home">
		<n-layout position="absolute">
			<n-layout-header bordered>
				<global-header :user="currentUser"></global-header>
			</n-layout-header>
			<n-layout-content position="absolute">
				<div class="menu-pic">
					<img
						alt="么么么哒"
						src="https://raw.githubusercontent.com/RockChang0556/pic/main/chang/Xnip2021-12-29_17-51-08.png"
					/>
				</div>
				<!-- <h3>阿畅的专属小网站, 后续更多功能建设中...</h3> -->
				<!-- <p>
					<router-link to="/eat">
						<n-button type="success">今天吃什么呢</n-button>
					</router-link>
				</p> -->
				<search></search>
			</n-layout-content>
		</n-layout>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui';
import GlobalHeader from '@/components/layout/header.vue';
import { useStore } from 'vuex';
import search from './search.vue';

export default defineComponent({
	name: 'home',
	components: { GlobalHeader, NLayout, NLayoutHeader, NLayoutContent, search },
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
