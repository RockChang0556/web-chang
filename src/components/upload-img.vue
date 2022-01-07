<!--
 * @Author: Rock Chang
 * @Date: 2022-01-04 11:27:13
 * @LastEditTime: 2022-01-07 16:53:42
 * @Description: 图片上传 - 暂时是 url 输入,推荐第三方图床
-->

<template>
	<div class="upload-img">
		<n-button @click="showModal = true"><slot> 来吧 </slot></n-button>
		<n-modal
			v-model:show="showModal"
			class="upload-img-dialog"
			transform-origin="center"
			preset="dialog"
			title="选择图片"
			@after-leave="cancelCallback"
		>
			<p>本站不提供图片存储服务, 请直接填入图片URL</p>
			<p>
				推荐使用第三方图床, 如
				<n-button
					text
					tag="a"
					href="https://imgkr.com/#upload"
					target="_blank"
					type="primary"
					>图壳</n-button
				>,
				<n-button
					text
					tag="a"
					href="https://sm.ms/"
					target="_blank"
					type="primary"
					>SM.MS</n-button
				>
			</p>
			<n-form-item :rule="rule" ref="formRef">
				<n-input
					v-model:value="picUrl"
					type="text"
					placeholder="请输入图片的url"
					@update:value="changePicUrl"
				/>
			</n-form-item>
			<div class="preview-img">
				<n-image
					width="200"
					:src="previewImg.url"
					:fallback-src="imgDefaultUrl"
					@error="errPreviewImg"
					@load="validate()"
				/>
				<p class="err-img" v-show="previewImg.err">图片加载失败</p>
			</div>
			<template #action>
				<n-button @click="showModal = false">取消</n-button>
				<n-button type="primary" @click="submitCallback">确认</n-button>
			</template>
		</n-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { imgDefaultUrl } from '@/config/constants';
import { NModal, NImage, NFormItem, FormValidationError } from 'naive-ui';
import debounce from 'lodash/debounce';
export default defineComponent({
	name: 'upload-img',
	components: { NModal, NImage, NFormItem },
	props: {},
	setup(prop, context) {
		const showModal = ref(false);
		const formRef = ref();
		const rule = {
			validator() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						if (previewImg.err || !picUrl.value) {
							reject(Error('请输入合法的图片路径'));
						}
						resolve(true);
					}, 600);
				});
			},
		};
		const picUrl = ref('');

		// 图片url输入框 change 事件
		const changePicUrl = debounce((val: string) => {
			previewImg.url = val;
			previewImg.err = false;
		}, 600);

		// 取消, 弹框关闭, 重置值
		const cancelCallback = () => {
			picUrl.value = '';
			previewImg.url = '';
			previewImg.err = false;
		};
		// 确定按钮
		const submitCallback = async () => {
			const err = await validate();
			if (!err) {
				showModal.value = false;
				context.emit('change', picUrl);
			}
		};

		// 校验图片url输入框
		const validate = async () => {
			return new Promise(resolve => {
				formRef.value.validate('', (errors?: Array<FormValidationError>) => {
					resolve(errors);
				});
			});
		};

		// 预览相关数据
		const previewImg = reactive({
			url: '',
			err: false,
		});
		const errPreviewImg = () => {
			previewImg.err = true;
		};

		return {
			showModal,
			cancelCallback,
			submitCallback,
			picUrl,
			formRef,
			rule,
			changePicUrl,
			previewImg,
			imgDefaultUrl,
			errPreviewImg,
			validate,
		};
	},
});
</script>

<style lang="less">
.upload-img-dialog {
	.n-dialog__content {
		> p {
			padding: 3px 0;
		}
	}
	.n-form-item {
		display: inherit;
		.n-input {
			margin: 5px 0;
		}
		.n-form-item-feedback-wrapper {
			padding-top: 0;
		}
	}
	.preview-img {
		text-align: center;
		color: #e6e6e6;
	}
}
</style>

