

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.51136692.js","_app/immutable/chunks/index.10330aa6.js"];
export const stylesheets = ["_app/immutable/assets/0.0eb4300f.css"];
export const fonts = [];
