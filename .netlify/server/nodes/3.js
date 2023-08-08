

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.bc04fafc.js","_app/immutable/chunks/index.10330aa6.js"];
export const stylesheets = ["_app/immutable/assets/3.306be8ad.css"];
export const fonts = [];
