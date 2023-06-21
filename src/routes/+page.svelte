<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { ViewerEvent } from '@speckle/viewer';
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
	} from '../stores/toolStore';
	import { buildViewerData } from '$lib/speckle/viewerBuilder';
	import UtilityBar from '/src/lib/components/modelViewer/UtilityBar.svelte';
	import Sidebar from '$lib/components/sidebarModal/Sidebar.svelte';

	export let data;

	let speckleStramToPass = '';
	let speckleViewerRunning = '';
	let loadCompleted = false;
	let _sidebar_show = get(sidebar_show);
	let selectedElement = [];

	//implement onMount function
	onMount(async () => {
		
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
					_sidebar_show = true;
					const selectedProto = viewerProtosData.find((item) => item.id === selectedElement[0]?.id);
					const selectedLote = viewerLotesData.find((item) => item.id === selectedElement[0]?.id);
					console.log(selectedProto, selectedLote,"========");
					if (selectedProto) {
						currentProto.set(selectedProto);
					} else if (selectedLote) {
						currentLote.set(selectedLote);
					}
				} else {
					_sidebar_show = false;
					currentLote.set(null);
					currentProto.set(null);
				}
			}
		});

		speckleViewer.subscribe((sv) => {
			speckleViewerRunning = sv;
			//console.log('from the store', get(speckleViewer));
		});
		speckleStream.subscribe((v) => {
			speckleStramToPass = v;
			let viewer = get(speckleViewer).speckleViewer;
			//console.log('viewer from page', v);
			if (viewer != null) {
				reloadViewer(speckleStramToPass);
				viewer.on('load-complete', (arg) => {
					speckleDatatree.set(viewer.getDataTree());
					const dtBuilder = buildViewerData();
					console.log('load comple from page.............', get(speckleParqueLotes));

					finishLoading.set(true);
				});
			}
		});
	});
</script>

<UtilityBar />
<div class="speckle-viewer-area">
	<SpeckleViewer speckleStream={speckleStramToPass} />
</div>

<Sidebar bind:show={_sidebar_show} />

<style>
	.speckle-viewer-area {
		width: 100%;
		height: full;
	}
	.sidebar {
		position: relative;
		width: 50rem;
	}
</style>
