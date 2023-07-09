<script>
	// 	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import SpeckleViewer from '$lib/components/SpeckleViewer.svelte';
	import { get } from 'svelte/store';
	import { reloadViewer } from '$lib/speckle/speckleHandler';
	import {
		speckleStream,
		speckleViewer,
		currentSelection,
		speckleDatatree,
		finishLoading,
		speckleParqueLotes,
		viewerProtos,
		viewerLotes,
		sidebar_show,
		currentLote,
		currentProto, 
		parkOperationCalendarID,
	} from '../stores/toolStore';
	import {fetchGoogleCalendarByID} from "$lib/components/google/googleCalendar.js";
	import UtilityBar from '$lib/components/modelViewer/UtilityBar.svelte';
	import DonoutKpiChart from '$lib/components/charts/DonoutKpiChart.svelte';
	import Sidebar from '$lib/components/sidebarModal/Sidebar.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';
	import GoogleCalendarInfoContainer from '$lib/components/googleComponents/GoogleCalendarInfoContainer.svelte';
	
	export let data;

	let speckleStramToPass = '';
	let speckleViewerRunning = '';
	let loadCompleted = $finishLoading;
	let _sidebar_show = get(sidebar_show);
	let selectedElement = [];
	let _viewerLotes = [];
	const _calendarID= get(parkOperationCalendarID);
	//implement onMount function
	onMount(async () => {
		//load calendar data 
		fetchGoogleCalendarByID(_calendarID);
		//handle sidebar show and hide
		currentSelection.subscribe((v) => {
			selectedElement = v;
			const viewerProtosData = get(viewerProtos);
			const viewerLotesData = get(viewerLotes);

			if (selectedElement && selectedElement.length > 0) {
				const viewerProtosDataIds = viewerProtosData.map((item) => item.id);
				const viewerLotesDataIds = viewerLotesData.map((item) => item.id);
				const viewerDataIds = [...viewerProtosDataIds, ...viewerLotesDataIds];
				//console.log(viewerDataIds.includes(selectedElement[0]?.id), viewerDataIds)
				if (viewerDataIds.includes(selectedElement[0]?.id)) {
					console.log('found showing sidebar', selectedElement[0]?.id);
					_sidebar_show = true;
					const selectedProto = viewerProtosData.find((item) => item.id === selectedElement[0]?.id);
					const selectedLote = viewerLotesData.find((item) => item.id === selectedElement[0]?.id);
					//console.log(selectedProto, selectedLote,"========");
					if (selectedProto) {
						currentProto.set(selectedProto);
					} else if (selectedLote) {
						currentLote.set(selectedLote);
					}
				} else {
					//console.log('not found hiding sidebar');
					_sidebar_show = false;
					currentLote.set(null);
					currentProto.set(null);
				}
			} else {
				_sidebar_show = false;
				currentLote.set(null);
				currentProto.set(null);
			}
		});

		speckleViewer.subscribe((sv) => {
			speckleViewerRunning = sv;
			//console.log('from the store', get(speckleViewer));
		});

	});
	finishLoading.subscribe((v) => {
		console.log('finishLoading', v);
		if (v) {
			loadCompleted = true;
		} else {
			loadCompleted = false;
		}
	});
	sidebar_show.subscribe((v) => {
		console.log('sidebar_show', v);
		_sidebar_show = v;
	});

</script>
<SpeckleViewer speckleStream={$speckleStream} />

{#if loadCompleted}
	<UtilityBar />
	<GoogleCalendarInfoContainer />
	<DonoutKpiChart dataProp={'Estado'} tittle="Disponibilidad:" />
	<Sidebar bind:show={_sidebar_show} />
{:else}

	<div class="center-loader">
		<Circle2 size="60" color="#FF3E00" unit="px" duration="1.5s" />
	</div>
{/if}

<style>
	.center-loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
