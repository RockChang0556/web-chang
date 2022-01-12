<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 10:48:13
 * @LastEditTime: 2022-01-12 18:34:23
 * @Description: 心愿单 - 表单组件
-->

<template>
	<div class="wish-form">
		<n-form :model="model" :rules="rules" :show-label="false" ref="wishRef">
			<n-form-item label="心愿单名称" path="name" class="name">
				<n-input
					v-if="isEdit"
					placeholder="添加心愿单名称"
					size="large"
					v-model:value.trim="model.name"
					maxlength="20"
				/>
				<p v-else>{{ model.name }}</p>
			</n-form-item>

			<n-form-item label="心愿单描述" path="summary" class="summary">
				<n-input
					v-if="isEdit"
					placeholder="添加心愿单描述"
					v-model:value="model.summary"
					type="textarea"
					size="large"
					:autosize="{
						minRows: 4,
						maxRows: 6,
					}"
				/>
				<pre v-else>{{ model.summary }}</pre>
			</n-form-item>
			<!-- 有值或编辑模式下显示标签 -->
			<n-form-item
				label="标签"
				path="tags"
				class="form-item-tags"
				v-if="model.tags?.length || isEdit"
			>
				<n-tooltip trigger="hover">
					<template #trigger>
						<r-icon name="youhui"></r-icon>
					</template>
					标签
				</n-tooltip>
				<n-dynamic-tags
					v-if="isEdit"
					size="large"
					type="primary"
					v-model:value="model.tags"
					:max="5"
				/>
				<n-tag
					v-else-if="model.tags?.length"
					v-for="(v, i) in model.tags"
					type="primary"
					:key="i"
				>
					{{ v }}
				</n-tag>
			</n-form-item>
		</n-form>
		<div class="form-handle">
			<div class="times">
				<template v-if="!isEdit">
					创建时间
					<n-time :time="new Date(model.created_at)" /> | 更新时间
					<n-time :time="new Date(model.updated_at)" />
				</template>
			</div>
			<div class="handle-btns">
				<template v-if="isEdit">
					<n-button v-if="model.created_at" text @click="onCancelEdit">
						取消
					</n-button>
					<n-button
						text
						type="primary"
						:loading="okBtnLoading"
						@click="onUpdateWish"
					>
						确认
					</n-button>
				</template>
				<n-button v-else text @click="isEdit = true">编辑</n-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType, computed, Ref } from 'vue';
import { useRoute } from 'vue-router';
import {
	FormValidationError,
	NForm,
	NFormItem,
	NDynamicTags,
	NTag,
	NTime,
} from 'naive-ui';
import { WishApi } from '@/services';
import router from '@/router';
export interface modelProp {
	name: string;
	summary: string;
	tags: string[];
	created_at: string;
	updated_at: string;
	[x: string]: any;
}
export default defineComponent({
	name: 'wish-form',
	components: { NForm, NFormItem, NDynamicTags, NTag, NTime },
	props: {
		models: {
			type: Object as PropType<modelProp>,
		},
		wishid: {
			type: String,
		},
	},
	setup(props) {
		const route = useRoute();
		const isEditPage = computed(() => route.name === 'editwish'); // 是否是编辑页面
		const isEdit = ref(false); // 表单是否编辑状态

		const { wishRef, model, rules, resetForm, validateForm } = useFormInit(
			props.models
		);

		const okBtnLoading = ref(false);
		// 更新心愿单
		const onUpdateWish = async () => {
			const send = async () => {
				const datas = {
					name: model.name,
					summary: model.summary,
					tag: model.tags,
				};
				try {
					okBtnLoading.value = true;
					if (isEditPage.value) {
						const { data } = await WishApi.updateWish(
							{ wishid: props.wishid },
							datas
						);
						model.updated_at = data.updated_at;
						window.$message.success('更新成功');
					} else {
						const { data } = await WishApi.addWish(datas);
						model.created_at = data.created_at;
						model.updated_at = data.updated_at;
						window.$message.success('创建成功');
						router.push({ name: 'editwish', params: { wishid: data.id } });
					}
					isEdit.value = false;
				} finally {
					okBtnLoading.value = false;
				}
			};
			try {
				await validateForm();
			} catch (error) {
				window.$message.error('请检查表单项');
			}
			// 发送更新或新增接口
			await send();
		};

		// 取消编辑
		const onCancelEdit = () => {
			isEdit.value = false;
			// 还原 model 的值
			resetForm();
		};

		const created = () => {
			if (!isEditPage.value) {
				isEdit.value = true;
			}
		};
		created();
		return {
			wishRef,
			model,
			rules,
			validateForm,
			isEdit,
			onUpdateWish,
			okBtnLoading,
			onCancelEdit,
		};
	},
});

function useFormInit(models: modelProp | undefined) {
	const wishRef = ref();
	const model: modelProp = reactive({
		name: models?.name || '',
		summary: models?.summary || '',
		tags: models?.tag,
		created_at: models?.created_at || '',
		updated_at: models?.updated_at || '',
	});

	const rules = {
		name: {
			required: true,
			message: '请输入心愿单名称',
		},
	};
	// 重置表单
	const resetForm = () => {
		model.name = models?.name || '';
		model.summary = models?.summary || '';
		model.tags = models?.tag;
		wishRef.value.restoreValidation();
	};

	// 校验表单
	const validateForm = () => {
		return new Promise((resolve, reject) => {
			wishRef.value.validate(async (errors: Array<FormValidationError>) => {
				if (!errors) {
					resolve(model); // 校验成功发送数据
				} else {
					reject(errors); // 校验失败发送错误信息
				}
			});
		});
	};
	return { wishRef, model, rules, resetForm, validateForm };
}
</script>

<style lang="less">
.wish-form {
	background: #f5f6f5;
	padding: 20px;
	.n-form {
		.name {
			text-align: center;
			.n-input {
				height: 50px;
				line-height: 55px;
			}
			.n-form-item-blank {
				display: block;
			}
			input,
			p {
				height: 50px;
				line-height: 55px;
				font-weight: 600;
				font-size: 26px;
			}
		}
		.summary {
			pre {
				margin-top: 13px;
				font-size: 15px;
			}
		}
		.form-item-tags {
			.n-form-item-blank {
				.r-icon {
					font-size: 26px;
					margin-right: 5px;
				}
				> .n-tag {
					margin: 0 8px 5px 0;
				}
			}
		}
	}
	.form-handle {
		display: flex;
		justify-content: space-between;
		.n-button {
			&:nth-of-type(2) {
				margin-left: 20px;
			}
		}
		.times {
			color: #909090;
		}
	}
}
</style>

