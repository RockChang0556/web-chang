<!--
 * @Author: Rock Chang
 * @Date: 2022-01-08 10:48:13
 * @LastEditTime: 2022-01-08 16:30:32
 * @Description: 心愿单 - 表单组件
-->

<template>
	<div class="wish-form">
		<n-form :model="model" :rules="rules" ref="wishRef">
			<n-form-item label="心愿单名称" path="name">
				<n-input
					placeholder="心愿单名称"
					size="large"
					v-model:value="model.name"
				/>
			</n-form-item>
			<n-form-item label="心愿单描述" path="summary">
				<n-input
					placeholder="心愿单描述"
					v-model:value="model.summary"
					type="textarea"
					size="large"
					:autosize="{
						minRows: 3,
						maxRows: 6,
					}"
				/>
			</n-form-item>
			<n-form-item label="标签" path="tags">
				<n-dynamic-tags
					size="large"
					type="primary"
					v-model:value="model.tags"
					:max="5"
				/>
			</n-form-item>
		</n-form>
	</div>
</template>

<script lang="ts">
import { FormValidationError, NForm, NFormItem, NDynamicTags } from 'naive-ui';
import { defineComponent, reactive, ref, PropType } from 'vue';

interface comModelProp {
	name: string;
	summary: string;
	[x: string]: any;
}
export interface propModelProp extends comModelProp {
	tags: string;
}
export interface modelProp extends comModelProp {
	tags: string[];
}
export default defineComponent({
	name: 'wish-form',
	components: { NForm, NFormItem, NDynamicTags },
	props: {
		models: {
			type: Object as PropType<propModelProp>,
		},
	},
	setup(props) {
		const model: modelProp = reactive({
			name: props.models?.name || '',
			summary: props.models?.summary || '',
			tags: props.models?.tag ? props.models.tag.split(',') : [],
		});
		const wishRef = ref();
		const rules = {
			name: {
				required: true,
				message: '请输入心愿单名称',
			},
		};
		// 重置表单 - 父级调用
		const resetForm = () => {
			model.name = '';
			model.summary = '';
			model.tags = [];
			wishRef.value.restoreValidation();
		};

		// 校验表单 - 父级调用
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
	},
});
</script>

<style lang="less"></style>

