export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["construction/DddImage.jpeg","construction/DddImage2.jpg","favicon.png","icons/arrow-badge-right.svg","icons/bolt.svg","icons/brand-google-maps.svg","icons/building-community.svg","icons/chevron-left.svg","icons/chevron-right.svg","icons/cloud-computing.svg","icons/filter-off.svg","icons/home-2.svg","icons/kpis/down.svg","icons/kpis/up.svg","icons/kpis/water-fee.svg","icons/robot.svg","icons/top.svg","icons/traffic-lights.svg","icons/user.svg","icons/x.svg","logoCTEC.png","smui.css"]),
	mimeTypes: {".jpeg":"image/jpeg",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.d6b23863.js","app":"_app/immutable/entry/app.c6a4a58b.js","imports":["_app/immutable/entry/start.d6b23863.js","_app/immutable/chunks/index.10330aa6.js","_app/immutable/chunks/singletons.e2feeb67.js","_app/immutable/chunks/paths.93e15c56.js","_app/immutable/entry/app.c6a4a58b.js","_app/immutable/chunks/index.10330aa6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/bimbot",
				pattern: /^\/api\/bimbot\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/bimbot/_server.js'))
			},
			{
				id: "/api/pmas",
				pattern: /^\/api\/pmas\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pmas/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
