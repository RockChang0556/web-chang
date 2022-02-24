<template>
	<n-spin :show="user.loading">
		<div class="home">
			<n-layout v-if="!user.loading && !user.err" position="absolute">
				<n-layout-header bordered>
					<GlobalHeader :user="currentUser"></GlobalHeader>
				</n-layout-header>
				<n-layout-content position="absolute">
					<router-view>
						<template #default="{ Component, route }">
							<!-- fade-slide -->
							<transition name="component-fade" mode="out-in" appear>
								<component :is="Component" :key="route.fullPath"></component>
							</transition>
						</template>
					</router-view>
				</n-layout-content>
			</n-layout>
		</div>
	</n-spin>
</template>

<script lang="ts" setup name="HomeWrap">
import { computed, onMounted, reactive } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent } from 'naive-ui';

import { useUserStore } from '@/store';
import GlobalHeader from '@/components/layout/header.vue';
import { getLocStorage } from '@/utils/token';

const userStore = useUserStore();

const currentUser = computed(() => userStore.userInfo);
const { user, getCurrentUser } = useUser();

onMounted(async () => {
	getCurrentUser();
});

function useUser() {
	const user = reactive({
		loading: false,
		err: true,
	});
	// 获取用户信息
	const getCurrentUser = async () => {
		const access_token = getLocStorage('access_token');
		if (access_token) {
			try {
				user.loading = true;
				await userStore.getUserInfo();
				user.err = false;
			} catch (err) {
				user.err = true;
				userStore.setUserInfo({ isFetched: true });
			} finally {
				user.loading = false;
			}
		} else {
			userStore.setUserInfo({ isFetched: true });
		}
	};
	return {
		user,
		getCurrentUser,
	};
}
</script>

<style lang="less">
.home {
	position: relative;
	min-height: 100vh;
	.n-layout-header {
		height: 71px;
	}
	> .n-layout {
		min-height: 100vh;
	}
	.n-layout-content {
		top: 71px;
		background-color: var(--tag-color);
	}
}
</style>
