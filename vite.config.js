import { sveltekit } from '@sveltejs/kit/vite';
import process  from "process";


const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
		  process: "process/browser"
		}
	},
	ssr: {
		noExternal: [
		  // Add the npm package that contains invalid code here
		  '@speckle/viewer',
		],
	  },
};

export default config;
