<!--
 * @Author: Rock Chang
 * @Date: 2022-02-20 21:48:01
 * @LastEditTime: 2022-02-20 23:41:47
 * @Description: 消息组件
 	用法: 
  $message.loading('正在验证...')
	$message.success('登录成功')
	$message.error('登录失败')
-->
<template></template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import type { MessageApi } from 'naive-ui';

const NMessage: any = useMessage();

let loadingMessage: any = null;

class Message {
	/**
	 * 规则：
	 * * loading message只显示一个，新的message会替换正在显示的loading message
	 * * loading message不会自动清除，除非被替换成非loading message，非loading message默认2秒后自动清除
	 */

	removeMessage(message: any, duration = 2000) {
		setTimeout(() => {
			if (message) {
				message.destroy();
				message = null;
			}
		}, duration);
	}

	showMessage(type: string, content: string, option: any = {}) {
		if (loadingMessage && loadingMessage.type === 'loading') {
			// 如果存在则替换正在显示的loading message
			loadingMessage.type = type;
			loadingMessage.content = content;

			if (type !== 'loading') {
				// 非loading message需设置自动清除
				this.removeMessage(loadingMessage, option.duration);
			}
		} else {
			// 不存在正在显示的loading则新建一个message,如果新建的message是loading message则将message赋值存储下来
			let message = NMessage[type](content, option);
			if (type === 'loading') {
				loadingMessage = message;
			}
		}
	}

	loading(content: string) {
		this.showMessage('loading', content, { duration: 0 });
	}

	success(content: string, option = {}) {
		this.showMessage('success', content, option);
	}

	error(content: string, option = {}) {
		this.showMessage('error', content, option);
	}

	info(content: string, option = {}) {
		this.showMessage('info', content, option);
	}

	warning(content: string, option = {}) {
		this.showMessage('warning', content, option);
	}
	destroyAll() {
		NMessage.destroyAll();
	}
}

window.$message = new Message() as unknown as MessageApi;

Object.defineProperty(window, '$message', {
	configurable: false,
	writable: false,
});
</script>
