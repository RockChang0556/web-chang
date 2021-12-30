<template>
	<div class="home">
		<img
			alt="么么么哒"
			src="https://raw.githubusercontent.com/RockChang0556/pic/main/chang/Xnip2021-12-29_17-51-08.png"
		/>
		<!-- <h3>阿畅的专属小网站, 后续更多功能建设中...</h3> -->
		<p>
			<router-link to="/eat">
				<n-button type="success">今天吃什么呢</n-button>
			</router-link>
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NButton } from 'naive-ui';

export default defineComponent({
	name: 'home',
	components: { NButton },
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.home {
	> img {
		width: 1000px;
	}
}
</style>
