<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { reloadViewer } from '$lib/speckle/speckleHandler';
	import {
		finishLoading,
		viewerProtos,
		viewerLotes,
		sidebar_show,
		currentSelection,
		currentLote,
		currentProto
	} from '/src/stores/toolStore';
	import { SpriteMaterial } from 'three';
	import SideBarRow from './SideBarRow.svelte';

	export let show = false;
	let modal_show = false;
	let proto = get(currentProto);
	let lote = get(currentLote);

	currentLote.subscribe((v) => {
		if (v) {
			lote = v;
			//console.log('-------', lote);
			proto = null;
		}
	});
	currentProto.subscribe((v) => {
		if (v) {
			const loteId = v?.LoteID;
			//get lote with teh same loteId
			const _lote = get(viewerLotes).find((item) => item.LoteID === loteId);
			const lote = _lote ? _lote : null;
			console.log('-------', lote);
			proto = v;
		}
	});

	function truncateString(str, maxLength) {
		let truncatedString = '';
		if (str.length <= maxLength) {
			truncatedString = str;
		} else {
			//check if its string if it is get the first 15 characters
			if (typeof str === 'string') {
				truncatedString = str.substring(0, maxLength) + '...';
			} else {
				truncatedString = str;
			}
		}
		return truncatedString;
	}
</script>

{#if show}
	<nav class="side-bar" transition:fly={{ x: 250, opacity: 1 }}>
		{#if lote}
			<span>Info Lote: {lote.LoteID}</span>
			<ol class="side-container">
				{#each Object.entries(lote) as [propName, propValue]}
				<SideBarRow propName = {propName} propValue = {propValue}/>
				{/each}
			</ol>
		{/if}

		{#if proto}
			<span>Info Proto: {proto.Nombre}</span>
			<div class="side-container">
				{#each Object.entries(proto) as [propName, propValue]}
				<SideBarRow propName = {propName} propValue = {propValue}/>
				{/each}
			</div>
		{/if}
	</nav>
{/if}

<style>
	.row-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		gap: 5px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding-left: 5px;
	}
	.side-container {
		display: flex;
		flex-direction: column;
		align-items: start;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding: 10px;
		justify-content: flex-start;
		gap: 5px;
		height: 50%;
		width: 100%;
	}
	.side-bar {
		position: fixed;
		right: 0;
		top:3rem;
		bottom: 0;
		height: 100%;
		padding: 2rem 1rem 0.6rem;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		width: 20em;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: flex-start;
		z-index: 5;
		border-radius: 5px;
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
		gap: 5px;
	}
</style>
