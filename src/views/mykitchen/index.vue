<!--
 * @Author: Rock Chang
 * @Date: 2022-01-21 16:10:35
 * @LastEditTime: 2022-01-21 17:38:30
 * @Description: 
-->
<template>
	<div class="mykitchen-page">
		<div class="profile">
			<div class="profile-avatar">
				<img
					src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg"
					alt=""
					class="profile-img"
				/>
				<div class="profile-name">Quan Ha</div>
			</div>
			<img
				src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
				alt=""
				class="profile-cover"
			/>
			<div class="profile-menu">
				<a class="profile-menu-link active">Timeline</a>
				<a class="profile-menu-link">About</a>
				<a class="profile-menu-link">Friends</a>
				<a class="profile-menu-link">Photos</a>
				<a class="profile-menu-link">More</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'mykitchen-page',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.mykitchen-page {
	width: 800px;
	height: 100%;
	margin: 0 auto;
	padding: 20px 0;
	.profile {
		position: relative;
		height: 40vh;
		min-height: 200px;
		max-height: 300px;
		z-index: 1;
		&-cover {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			border-radius: 4px;
		}

		&:before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
			background-image: url('https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80');
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			filter: blur(50px);
			opacity: 0.7;
		}
	}

	.profile-menu {
		position: absolute;
		bottom: 0;
		padding-left: 200px;
		width: 100%;
		display: flex;
		background: #fff;
		border-radius: 0 0 4px 4px;
		.profile-menu-link {
			padding: 20px 16px;
			transition: 0.3s;
			cursor: pointer;

			&.active,
			&:hover {
				color: #fff;
				background-color: #1b1d2e;
				border-bottom: 3px solid #1488fa;
			}
		}
	}

	.profile-avatar {
		position: absolute;
		align-items: center;
		display: flex;
		z-index: 1;
		bottom: 16px;
		left: 24px;
		.profile-img {
			width: 150px;
			height: 150px;
			border-radius: 50%;
			object-fit: cover;
			border: 3px solid #151728;
		}

		.profile-name {
			margin-left: 24px;
			margin-bottom: 24px;
			font-size: 22px;
			color: #fff;
			font-weight: 600;
		}
	}
}
@media screen and (max-width: 800px) {
	.mykitchen-page {
		.profile-avatar {
			top: -25px;
			left: 50%;
			transform: translatex(-50%);
			align-items: center;
			flex-direction: column;
			justify-content: center;
			.profile-img {
				height: 100px;
				width: 100px;
			}
			.profile-name {
				margin: 5px 0;
			}
		}
		.profile-menu {
			padding-left: 0;
			width: 100%;
			overflow: auto;
			justify-content: center;
		}
		.profile-menu-link {
			padding: 16px;
			font-size: 15px;
		}
	}
}
</style>

