import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import ViteComponents, { NaiveUiResolver } from 'vite-plugin-components';

import { resolve } from 'path';
const env = loadEnv('production', './');

// https://vitejs.dev/config/
export default defineConfig({
	base: `${env.VITE_BASE_URL}/`,
	plugins: [
		vue({
			refTransform: true, // 开启ref转换 https://juejin.cn/post/7054317318343491615#heading-10
		}),
		VueSetupExtend(), // script标签支持name, <script lang="ts" setup name="OrderList">
		ViteComponents({
			customComponentResolvers: [NaiveUiResolver()],
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	// 打包配置
	build: {
		target: 'modules',
		// outDir: 'dist', //指定输出路径
		// assetsDir: 'assets', // 指定生成静态资源的存放路径
		minify: 'terser', // 混淆器，terser构建后文件体积更小
		terserOptions: {
			// 生产环境去除 console debugger
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules') && id.includes('naive-ui')) {
						return 'naive-ui';
					} else if (id.includes('node_modules') && id.includes('vue')) {
						return 'vue';
					} else if (id.includes('node_modules') && id.includes('lodash')) {
						return 'lodash';
					} else if (id.includes('node_modules')) {
						return 'vendor';
					}
				},
			},
		},
	},
	server: {
		host: '0.0.0.0',
		port: 8001,
		cors: true, // 默认启用并允许任何源
		// open: true, // 在服务器启动时自动在浏览器中打开应用程序
		//反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
		proxy: {
			'/api': {
				target: 'http://localhost:3000', //代理接口
				changeOrigin: true,
				// rewrite: path => path.replace(/^\/api/, ''),
			},
			'/jisuapi': {
				target: 'https://way.jd.com', //代理接口
				changeOrigin: true,
				// rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
});
