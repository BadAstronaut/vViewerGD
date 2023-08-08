import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.7a6cde31.js","_app/immutable/chunks/paths.93e15c56.js","_app/immutable/chunks/index.10330aa6.js"];
export const stylesheets = ["_app/immutable/assets/2.f6ad91b9.css"];
export const fonts = [];
