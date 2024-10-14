/*
 * @Author: xiaozhaoJqk
 * @Date: 2024-08-06 21:38:25
 * @LastEditTime: 2024-08-06 22:45:11
 * @LastEditors: xiaozhaoJqk
 * @Description: 
 * @FilePath: \p_manager\vite.config.ts
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		viteCommonjs(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	resolve: {
		alias: {
			'@': '/src',
			'~': '/src/assets'
		}
	},
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
});
