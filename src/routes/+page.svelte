<script>
	// 	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { CameraController, SelectionExtension, FilteringExtension } from '@speckle/viewer';
	import SpeckleViewer from '$lib/components/SpeckleViewer.svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import {
		reloadViewer,
		groupBuilderPassports,
		colorByGroupedPassport
	} from '$lib/speckle/speckleHandler';
	import {
		speckleStream,
		speckleViewer,
		currentSelection,
		currentLote,
		currentProto,
		finishLoading,
		userID,
		viewerProtos,
		viewerLotes,
		viewerIoTElements,
		viewerPMasGroupedPassports,
		sidebar_show,
		speckleDatatree,
		speckleParqueLotes,
		socketIoUrl,
		socketIoUrlLocal,
		selectedPassports as selectedSensor,
		parkOperationCalendarID
	} from '../stores/toolStore';
	import { fetchGoogleCalendarByID } from '$lib/components/google/googleCalendar.js';
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
	const _calendarID = get(parkOperationCalendarID);

	//handle userID to from iframe url http://localhost:5173/?userId=123&speckleUrl=ef054552c3
	let _userId = $page.url.searchParams.get('userId');
	let _currentSpeckleStream = $page.url.searchParams.get('speckleUrl');
	if (_currentSpeckleStream) {
		speckleStream.set(_currentSpeckleStream);
	}
	userID.set(_userId);
	//console.log(_userId, 'from the page');

	//socket to change stream dynamically
	//add code to get the passport from the socket
	//load the passport to a store and filter elements in model each time store changes.
	//each time a passport is pass it should reset filters, filter by new value and color based on passport Colors.
	// Register the client with the server

	// production
	const socket = io(get(socketIoUrl));
	// local
	//const socket = io(get(socketIoUrlLocal));

	socket.emit('register', _userId);
	console.log('socket connected', _userId);

	socket.on('dataUpdated', (message) => {
		const _speckleStream = message.speckleUrl;
		const _sensorID = message.sensorID;
		const currentStream = get(speckleStream);
		const _finishLoading = get(finishLoading);
		const activeV = get(speckleViewer).speckleViewer;
		const currentSensors = get(viewerIoTElements);
		console.log('current viewer active V', activeV);

		if (_speckleStream && currentStream !== _speckleStream) {
			console.log(_speckleStream, _sensorID, 'data updated from socket');
			speckleStream.set(_speckleStream);
			selectedSensor.set(_sensorID);
			finishLoading.set(false);
			reloadViewer();
		} else {
			console.log(currentSensors, _sensorID, 'data updated from socket');
			selectedSensor.set(_sensorID);
			if (finishLoading) {
				//console.log('saved sensors', activeV);
				// Filter sensors that match the _sensorID, then map their ids
				const flatList = currentSensors
					.filter((sensor) => sensor.sensorID === _sensorID)
					.map((sensor) => sensor.id);

				console.log('flat list after filtering', flatList);
				const filteringExtension = activeV.extensions.Gi;
				//console.log('filtering extension', flatList, filteringExtension);
				filteringExtension.isolateObjects(flatList);
			}
		}
	});

	//clean up on destroy
	onDestroy(() => {
		socket.disconnect();
	});
	// viewerPMasGroupedPassports.subscribe((vGroup) => {
	// 	console.log(vGroup, 'updated group........');
	// });

	//implement onMount function
	onMount(async () => {
		//load calendar data
		//handle sidebar show and hide
		currentSelection.subscribe((v) => {
			selectedElement = v;
			const viewerProtosData = get(viewerProtos);
			if (selectedElement && selectedElement.length > 0) {
				const viewerProtosDataIds = viewerProtosData.map((item) => item.id);
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

{#if !_userId || !_currentSpeckleStream}
	<div class="no-model">
		<h1>No se ha registrado userID o modelo BIM</h1>
	</div>
{:else}
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
{/if}

<style>
	.center-loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.no-model {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
