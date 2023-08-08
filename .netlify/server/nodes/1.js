

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.dbde62c6.js","_app/immutable/chunks/index.10330aa6.js","_app/immutable/chunks/singletons.e2feeb67.js","_app/immutable/chunks/paths.93e15c56.js"];
export const stylesheets = [];
export const fonts = [];
