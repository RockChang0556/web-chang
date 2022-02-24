<!--
 * @Author: Rock Chang
 * @Date: 2022-02-20 21:48:01
 * @LastEditTime: 2022-02-20 23:40:04
 * @Description: 弹框组件
	用法: 
	$dialog.confirm({
    content: '确认删除？',
    confirm() {
      $dialog.success('删除成功', { positiveText: '我知道了' })
    },
    cancel() {
      $dialog.warning('已取消', { closable: true })
    },
  })
-->
<template></template>

<script lang="ts" setup>
import { isNullOrUndef } from '@/utils/is';
import { DialogApi, useDialog } from 'naive-ui';

const NDialog: any = useDialog();

class Dialog {
	success(title: string, option: any) {
		this.showDialog('success', { title, ...option });
	}

	warning(title: string, option: any) {
		this.showDialog('warning', { title, ...option });
	}

	error(title: string, option: any) {
		this.showDialog('error', { title, ...option });
	}

	showDialog(type = 'success', option: any) {
		if (isNullOrUndef(option.title)) {
			// ! 没有title的情况
			option.showIcon = false;
		}
		NDialog[type]({
			positiveText: 'OK',
			closable: false,
			...option,
		});
	}

	confirm(option: any = {}) {
		this.showDialog(option.type || 'error', {
			positiveText: '确定',
			negativeText: '取消',
			onPositiveClick: option.confirm,
			onNegativeClick: option.cancel,
			onMaskClick: option.cancel,
			...option,
		});
	}
}

window.$dialog = new Dialog() as unknown as DialogApi;
Object.freeze(window.$dialog);
Object.defineProperty(window, '$dialog', {
	configurable: false,
	writable: false,
});
</script>
