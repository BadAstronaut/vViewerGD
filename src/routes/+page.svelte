<script>
	// 	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import SpeckleViewer from '$lib/components/SpeckleViewer.svelte';
	import { get } from 'svelte/store';
	import { reloadViewer, groupBuilderPassports, colorByGroupedPassport } from '$lib/speckle/speckleHandler';
	import {
		speckleStream,
		speckleViewer,
		currentSelection,
		currentLote,
		currentProto, 
		finishLoading,
		viewerProtos,
		viewerLotes,
		viewerPMasElements,
		viewerPMasGroupedPassports,
		sidebar_show,
		speckleDatatree,
		speckleParqueLotes,
		socketIoUrl,
		selectedPassports,
		parkOperationCalendarID,
	} from '../stores/toolStore';
	import {fetchGoogleCalendarByID} from "$lib/components/google/googleCalendar.js";
	import UtilityBar from '$lib/components/modelViewer/UtilityBar.svelte';
	import DonoutKpiChart from '$lib/components/charts/DonoutKpiChart.svelte';
	import Sidebar from '$lib/components/sidebarModal/Sidebar.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';
	import GoogleCalendarInfoContainer from '$lib/components/googleComponents/GoogleCalendarInfoContainer.svelte';
	import { io } from 'socket.io-client';
	export let data;

	let speckleStramToPass = '';
	let speckleViewerRunning = '';
	let loadCompleted = $finishLoading;
	let _sidebar_show = get(sidebar_show);
	let selectedElement = [];
	let _viewerLotes = [];
	const _calendarID= get(parkOperationCalendarID);
	
	//socket to change stream dynamically
	//add code to get the passport from the socket
	//load the passport to a store and filter elements in model each time store changes. 
	//each time a passport is pass it should reset filters, filter by new value and color based on passport Colors. 
	const socket = io(get(socketIoUrl));
	socket.on('dataUpdated', (message) => {
		const _speckleStream = message.speckleUrl;
		const _passportIDs = message.passports;
		const currentStream = get(speckleStream);
		if (_speckleStream && currentStream !== _speckleStream) {
			//console.log(_speckleStream, _passportIDs, 'data updated from socket');
			speckleStream.set(_speckleStream);
			selectedPassports.set(_passportIDs);
			finishLoading.set(false);
			reloadViewer();
		} else{
			selectedPassports.set(_passportIDs);
			
		}
		

	});

	// viewerPMasGroupedPassports.subscribe((vGroup) => {
	// 	console.log(vGroup, 'updated group........');
	// });

	selectedPassports.subscribe((newPass) => {
		const _finishLoading = get(finishLoading);
		const pmasElements  = get(viewerPMasElements)
		const getGrouped = get(viewerPMasGroupedPassports);
		console.log(getGrouped, _finishLoading, 'updated group........');
		const selectedGroups = [];
		if(finishLoading){
			newPass.forEach(value => {
				//iterate over the array of objects getGrouped and filter the group with IDPasaporte equal to value
				const element = getGrouped.find(item => item.IDPasaporte === value);
				//console.log(element, 'getGrouped');
				//console.log(element, 'element');
				if(element){
					selectedGroups.push(element);
				}
			})
		}
		if( selectedGroups.length >0){
			colorByGroupedPassport(selectedGroups);
		}
		console.log("selected group ", selectedGroups);
	})
	

	//implement onMount function
	onMount(async () => {
		//load calendar data 
		//handle sidebar show and hide
		currentSelection.subscribe((v) => {
			selectedElement = v;
			const viewerProtosData = get(viewerProtos);
			if (selectedElement && selectedElement.length > 0) {
				const viewerProtosDataIds = viewerProtosData.map((item) => item.id);
				const viewerDataIds = [...viewerProtosDataIds, ...viewerLotesDataIds];
				if (viewerDataIds.includes(selectedElement[0]?.id)) {
					console.log('found showing sidebar', selectedElement[0]?.id);
					_sidebar_show = true;
					const selectedProto = viewerProtosData.find((item) => item.id === selectedElement[0]?.id);
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
<SpeckleViewer _speckleStream={$speckleStream} />

{#if loadCompleted}
	<UtilityBar />
	<!-- <GoogleCalendarInfoContainer /> -->
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
