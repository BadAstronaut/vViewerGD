import { sveltekit } from '@sveltejs/kit/vite';
import process  from "process";


const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
		  process: "process/browser"
		}
	}
};

export default config;

