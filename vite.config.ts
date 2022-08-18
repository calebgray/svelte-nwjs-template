import type {OutputPlugin, Plugin} from 'rollup';
import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import reload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-porter';
import {argv} from 'process';

const plugins: OutputPlugin[] = [
	css(),
	svelte({
		include: 'src/**/*.svelte',
		preprocess: [
			sveltePreprocess['typescript'](),
		],
		hot: {
			preserveState: true,
			noPreserveStateKey: '@hmr:reset',
			preserveStateKey: '@hmr:keep',
			noReload: false,
			optimistic: false,
			noDisableCss: false,
			injectCss: false,
			cssEjectDelay: 0,
		},
		compilerOptions: {
			generate: 'ssr',
			hydratable: true
		}
	}),
	resolve({browser: true}),
];
if (argv.includes('--watch')) {
	plugins.push(reload());
	plugins.push(serve({
		contentBase: 'dist',
		historyApiFallback: true,
	}));
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte({
			preprocess: [
				sveltePreprocess['typescript'](),
			],
		}),
	],
	root: 'src',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: 'src/index.html',
			output: {
				dir: 'dist',
				format: 'commonjs'
			},
			plugins,
		},
	},
});
