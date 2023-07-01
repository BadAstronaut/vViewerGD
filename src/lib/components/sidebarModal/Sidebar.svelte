<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { reloadViewer } from '$lib/speckle/speckleHandler';
	import {
		finishLoading,
		viewerProtos,
		viewerLotes,
		speckleViewer,
		sidebar_show,
		currentSelection,
		currentLote,
		currentProto,
		servicesSelected,
		servicesAvailable,
		colorValueDisponibility
	} from '/src/stores/toolStore';
	import {
		selectElementsByPropNameValue,
		resetViewerFilters
	} from '/src/lib/speckle/speckleHandler.js';
	import { SpriteMaterial } from 'three';
	import SideBarRow from './SideBarRow.svelte';
	import MultiSelect from './MultiSelect.svelte';

	export let show = false;
	let modal_show = false;
	let proto = get(currentProto);
	let lote = get(currentLote);
	let filterService = false;
	let _servicesSelected = $servicesSelected;

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

	servicesSelected.subscribe((v) => {
		//console.log('service selected change', v,_servicesSelected);
		//check if the array is empty
		if (v.length != 0) {
			filterService = true;
		} else {
			filterService = false;
			//console.log('filterService hidden', v);
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
	//here we will write the function that filters the viewer elements based on containing a service or not
	function viewerFilterByServices(selectedArray) {
		const selectedArrayKeys = Object.keys(selectedArray);
		const colors = get(colorValueDisponibility);
		const activeV = get(speckleViewer).speckleViewer;
		const _viewerLotes = get(viewerLotes);
		if (selectedArrayKeys.length != 0 && get(finishLoading)) {
			//for each _viewerLotes we need to check Servicios prop and see which of the selected filters are in the array if they are all present select it if not pass it
			const filteredLotes = _viewerLotes.filter((lote) => {
				const hasSelectedServices = selectedArrayKeys.every((selectedService) => {
					return lote.Servicios.includes(selectedService);
				});
				//console.log('hasSelectedServices',hasSelectedServices);
				return hasSelectedServices;
			});
			//get the array of ids from the filteredLotes
			const filteredLotesIds = filteredLotes.map((lote) => lote.id);
			const dispQueryObject = {
				objectIds: filteredLotesIds,
				color: colors.Disponible
			};
			activeV.setUserObjectColors([dispQueryObject])
			console.log('viewerLotes', filteredLotesIds);
		}
		else{
			resetViewerFilters();
		}
	}
</script>

{#if show}
	<nav class="side-bar" transition:fly={{ x: 250, opacity: 1 }}>
		{#if filterService}
			<span>Filtro por Servicio:</span>
			<div class="side-service-filter">
				<MultiSelect id="lang" onChange={(selectedArray) => viewerFilterByServices(selectedArray)}>
					{#each get(servicesAvailable) as service}
						<option value={service}>{service}</option>
					{/each}
				</MultiSelect>
			</div>
		{/if}
		{#if lote}
			<span>Info Lote: {lote.LoteID}</span>
			<ol class="side-container">
				{#each Object.entries(lote) as [propName, propValue]}
					<SideBarRow {propName} {propValue} />
				{/each}
			</ol>
		{/if}

		{#if proto}
			<span>Info Proto: {proto.Nombre}</span>
			<div class="side-container">
				{#each Object.entries(proto) as [propName, propValue]}
					<SideBarRow {propName} {propValue} />
				{/each}
			</div>
		{/if}
	</nav>
{/if}

<style>
	.side-container {
		display: flex;
		flex-direction: column;
		align-items: start;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding: 1rem;
		padding-bottom: 2rem;
		justify-content: flex-start;
		gap: 5px;
		height: auto;
		width: 100%;
	}
	.side-service-filter {
		display: flex;
		flex-direction: column;
		align-items: start;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding: 10px;
		justify-content: flex-start;
		gap: 5px;
		height: auto;
		width: 100%;
	}
	.side-bar {
		position: fixed;
		right: 0;
		top: 3rem;
		height: auto;
		max-height: 90vh;
		min-height: 50vh;
		padding: 2rem 1rem 1rem;
		margin-right: 1rem;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		width: 20em;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 1rem;
		z-index: 5;
		border-radius: 5px;
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
	}
</style>
