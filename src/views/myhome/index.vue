<!--
 * @Author: Rock Chang
 * @Date: 2022-01-07 16:25:28
 * @LastEditTime: 2022-01-07 17:01:27
 * @Description: 首页
-->
<template>
	<div class="home-page">
		<div class="menu-pic">
			<!-- <img
						alt="么么么哒"
						src="https://s2.loli.net/2022/01/04/7Ss8G6CEYgVF3Xn.png"
					/> -->
		</div>
		<!-- <h3>阿畅的专属小网站, 后续更多功能建设中...</h3> -->
		<!-- <p>
					<router-link to="/eat">
						<n-button type="success">今天吃什么呢</n-button>
					</router-link>
				</p> -->
		<!-- <search></search>
				<com-upload-img></com-upload-img> -->
		<!-- <n-button @click="getMyFoods">获取所有菜品</n-button> -->
		<n-button class="random-btn">开始随机</n-button>
		<router-link :to="{ name: 'mywish' }">我的心愿单</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'home-page',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.home-page {
	height: 100%;
	text-align: center;
	padding-top: 300px;
	// .random-btn {
	// 	position: absolute;
	// }
}
</style>
