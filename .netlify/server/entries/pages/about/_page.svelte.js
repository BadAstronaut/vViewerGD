import { c as create_ssr_component, e as escape } from "../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-mcp6ps{color:blue}",
  map: null
};
let message = "Hello, SvelteKit!";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main><h1 class="svelte-mcp6ps">${escape(message)}</h1></main>`;
});
export {
  Page as default
};
