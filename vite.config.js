import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import autoprefixer from 'autoprefixer'

const path = require('path')
import defaultSettings from "./setting.js"

// https://vitejs.dev/config/
export default defineConfig({
	// 开发服务器配置
	server: {
		// host: '127.0.0.1',
		port: 6543,
		open: false,
		proxy: {
			"/api": {
				target: defaultSettings.target,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	resolve: {
		// 导入时想要省略的扩展名列表。注意，不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持
		// extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias: {
			// 键必须以斜线开始和结束
			'@': path.resolve(__dirname, 'src')
		}
	},
	css: {
		//内联的 PostCSS 配置
		postcss: {
			plugins: [
				autoprefixer({
					// 配置使用 autoprefixer
					overrideBrowserslist: ["last 15 versions"]
				})
			]
		},
		// 指定传递给 CSS 预处理器的选项
		preprocessorOptions: {
			scss: {
				charset: false,
				additionalData: `
				@use "@/styles/variables.scss" as *;
				@use "@/styles/element-variables.scss" as *;
				@use "@/styles/mixin.scss" as *;
				`
			}
		}
	},
	build: {
		minify: 'terser',
		brotliSize: false,
		// 消除打包大小超过500kb警告
		chunkSizeWarningLimit: 2000,
		//remote console.log in prod
		terserOptions: {
			//detail to look https://terser.org/docs/api-reference#compress-options
			compress: {
				drop_console: false,
				pure_funcs: ['console.log', 'console.info'],
				drop_debugger: true
			}
		},
		assetsDir: 'static/assets/',
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
			}
		},
	},
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'vuex'
			],
			resolvers: [ElementPlusResolver({
				importStyle: "sass"
			})],
			// dts : true
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass"
				})
			],
			// dts : true
		})
	]
})
