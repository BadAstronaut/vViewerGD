//import adapter from '@sveltejs/adapter-netlify';
//use the node adapter for aws
import adapter from '@sveltejs/adapter-node';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
