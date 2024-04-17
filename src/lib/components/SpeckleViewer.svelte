<script>
	import { Viewer, DefaultViewerParams, SpeckleLoader , ViewerEvent} from "@speckle/viewer";
	import { CameraController, SelectionExtension } from "@speckle/viewer";
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
	import { get } from 'svelte/store';
	import {
		fetchUserData,
		reloadViewerGetObjectsByIds,
		handleBeaconOrigin,
		reloadViewer
	} from '$lib/speckle/speckleHandler';
	
	import {
		speckleViewer,
		speckleStream,
		finishLoading,
		currentSelection,
		speckleDatatree,
		currentLote,
		currentProto,
		sidebar_show,
		servicesSelected
	} from '../../stores/toolStore';

	export let _speckleStream;
	//const speckleViewer = toolStore.speckleViewer
	console.log(speckleStream, "from viwer updated.......")

	let viewerVal;
	let maxRad = 4;
	let rad = 0.1;
	let opa = 1;
	let spheres = [];
	let v;
	let coor = [];
	let labelRenderer;

	

	onMount(() => {
		 /** Configure the viewer params */
		 const params = DefaultViewerParams;
			params.showStats = false;
			params.verbose = false;
		//console.log('viewer dynamic update' , speckleStreams[idUpdate]);
		v = new Viewer(viewerVal);
		console.log("this is the viewerf",v);
		v.on(ViewerEvent.ObjectClicked, (args) => {
			if (args) {
				//console.log(args,"clicked");
				//this changed not sure why  args.userData.id
				const clieckedElement = args.hits[0].node;
				console.log(clieckedElement, 'clicked!');
				//v.selectObjects([clieckedElement.model.raw.id]);

				// @ts-ignore
				currentSelection.set([clieckedElement]);
			} else {
				//v.resetSelection();
				// @ts-ignore
				currentSelection.set([]);
				currentLote.set(null);
				currentProto.set(null);
				servicesSelected.set([]);
			}
			//console.log(v.needsRender);
		});
		// @ts-ignore
		// import the data tree store and save it in here
		//console.log("viewer store set",get(speckleViewer) )
		v.setLightConfiguration({
			azimuth: 0.55,
			castShadow: true,
			color: 16777215,
			elevation: 1.33,
			enabled: true,
			indirectLightIntensity: 1.2,
			intensity: 9,
			radius: 0
		});
		console.log('viewer here.....', _speckleStream);
		//let branch =  fetchStreamData(speckleStreams.NLW01);
		//let userD = fetchUserData();
		//console.log("user data");
		//Espacio Colaborativo
		const speckObj = reloadViewerGetObjectsByIds(v, _speckleStream, [], []);
		//console.log("speckleObj",v.speckleRenderer._scene);
		//twoDCard(v);
	});


	speckleStream.subscribe((speckleS) => {
		console.log('speckleStream........', speckleS);
		if (v && speckleS) {
			const speckObj = reloadViewerGetObjectsByIds(v, speckleS, [], []);
		}
		
	});
</script>

<div bind:this={viewerVal} class="viewer" />

<style>
	.viewer {
		border-radius: 5px;
		opacity: 0.9;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		min-height: 100%;
		min-width: 100%;
	}
</style>
