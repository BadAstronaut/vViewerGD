<script>
	import { getContext, onMount, onDestroy } from 'svelte';
	import '/src/css/styles.css';
    import 'tippy.js/themes/light.css';
    import tippy from "sveltejs-tippy";
	import { finishLoading } from '/src/stores/toolStore';
	export let icon;
	export let toExecute;
	export let active;
	export let commandName;
	let _activeControler = false;
	let expanded;
	let htmlbutton;
	let currentTippy;

    const props = {
    content:  `<span class='tooltip'>${commandName}</span>` ,
    allowHTML: true,
    placement: "right",
    delay: [200, 0],
    maxWidth: "none",
    touch: true,
    animation: 'fade',
    theme: 'light',
  };

	finishLoading.subscribe((v) => {
		expanded = v;
	});
	function controlExecution() {
		if (active) {
			console.log(_activeControler);
			_activeControler = !_activeControler;
		}

		toExecute();
	}
	onMount(() => {

	});



	//onDestroy(expanded);
</script>

<button
	bind:this={htmlbutton}
    use:tippy={props}
	id="toolbarButton"
	aria-expanded={expanded}
	aria-haspopup="true"
	on:click={controlExecution}
	class="tool-bar-button neomorfic-div neomorfic-div-hover"
	class:active={_activeControler}
>
	<img class="button-icon" src={icon} alt="" />
</button>

<style>
    :global(.tooltip) {
    font-size: 0.8rem;
    background-color: transparent;
    border: none;
  }
	.tool-bar-button {
		position: relative;
		border-radius: 50%;
		border-width: 0px;
		padding: 1px;
		margin: 1px;
		width: 2.2em;
		height: 2.2em;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		/* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1); */
		cursor: pointer;
		/* transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); */
	}
	.active {
		background-color: lightblue;
	}
</style>
