import { c as create_ssr_component } from "../../chunks/index2.js";
const pico_min = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "nav.svelte-knad4h{display:flex;align-items:flex-start;justify-content:flex-start;flex-direction:row;padding-top:0.5rem;padding-bottom:0.5rem;width:100%;height:1vh}.title.svelte-knad4h{font-size:0.9rem;padding:0;margin:0}.head-title.svelte-knad4h{position:absolute;top:-5px;left:5em;padding:5px;display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;height:1.5em;width:100vw;margin:0}.coord.svelte-knad4h{font-size:0.7rem;height:1em;font-weight:500;margin:0}.logo.svelte-knad4h{position:absolute;top:-5px;left:0;width:4.5em;height:auto;padding:5px}html{overflow:hidden;overflow-y:hidden}body{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;height:100vh;width:120vw;margin:0;padding:0}main.svelte-knad4h{position:relative;height:98vh;width:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;margin:0;padding:0}footer.svelte-knad4h{text-align:center;color:rgba(94, 104, 121, 0.388);padding:0;height:1vh;width:100%;z-index:1000;margin:0}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav class="layout svelte-knad4h">
	<img class="logo svelte-knad4h" src="/logoCTEC.png" alt="logoCTEC" width="auto" height="auto">
	<div class="head-title svelte-knad4h"><h1 class="title svelte-knad4h">Parque Tecnológico Laguna Caren</h1>
		<h2 class="coord svelte-knad4h">33°26&#39;12.2&quot;S, 70°50&#39;20.0&quot;W</h2></div>
	</nav>

<main class="svelte-knad4h">${slots.default ? slots.default({}) : ``}</main>

<footer class="layout svelte-knad4h">©Vero Viewer 0.1</footer>`;
});
export {
  Layout as default
};
