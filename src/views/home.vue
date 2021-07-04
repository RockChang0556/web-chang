<template>
	<div class="home">
		<img alt="么么么哒" src="../assets/IMG_1864.jpg" />
		<h3>阿畅的专属小网站, 后续更多功能建设中...</h3>
		<p>
			<router-link to="/eat"><button>今天吃什么呢</button></router-link>
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'home',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.home {
	> img {
		width: 200px;
	}
}
</style>
