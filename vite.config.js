import { sveltekit } from '@sveltejs/kit/vite';
import process  from "process";
import { defineConfig } from 'vite'
import { Server } from 'socket.io'
let io ;
// const config = {
// 	plugins: [sveltekit()],
// 	resolve: {
// 		alias: {
// 		  process: "process/browser"
// 		}
// 	},
// 	ssr: {
// 		noExternal: [
// 		  // Add the npm package that contains invalid code here
// 		  '@speckle/viewer',
// 		],
// 	  },
// };

export default defineConfig({
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
})

export {io};
//export default config;
