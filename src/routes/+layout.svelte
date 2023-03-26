<script>
import pico from "@picocss/pico"


</script>
<nav class="layout">
	
<!-- add logoCTEC as a a logo in the top left corner of the nav bar -->
  <img class="logo" src="/logoCTEC.png" alt="logoCTEC" width="70" height="auto">
  <a data-sveltekit-preload-data="tap" href="/">Mod Habitar</a>
  <a data-sveltekit-preload-data="tap" href="/viviendas/vivienda-1">Vivienda 1</a>
  <a data-sveltekit-preload-data="tap" href="/viviendas/vivienda-2">Vivienda 2</a>
</nav>

<main>
<slot></slot>
</main>



<footer class="layout">© CTEC 2023</footer>

<style>
nav {
		background: hsla(0, 3%, 77%, 0.4);
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	nav,
	footer {
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.1px;
		font-weight: 500;
	}
	.logo {
		position: absolute;
		top: -5px;
		left: 0;
		padding: 5px;

	}

	:global(html) {
		/* scrollbar-gutter: stable; */
		overflow: hidden;
		overflow-y: scroll;
	}

	:global(.layout) {
		--width: 700px;
		padding-left: max(1rem, calc(calc(100vw - var(--width)) / 2));
		padding-right: max(1rem, calc(calc(100vw - var(--width)) / 2));
	}

	main {
		display: flex;
		flex-direction: row;
		min-height:calc(100vh - 4rem) ;
		align-items: stretch;
		
	}

	footer {
		text-align: center;
		margin: 0.4rem 0;
		color: rgba(94,104,121,0.388);
		padding: 0;
		max-height: 30px;
	}
</style>