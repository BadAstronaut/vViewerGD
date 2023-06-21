<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { ViewerEvent } from '@speckle/viewer';
	import SpeckleViewer from '$lib/components/SpeckleViewer.svelte';
    import { get } from 'svelte/store';
    import { reloadViewer } from '$lib/speckle/speckleHandler';
    import { speckleStream, speckleViewer, currentSelection, speckleDatatree , finishLoading, speckleParqueLotes} from '../stores/toolStore';
    import {buildViewerData} from '$lib/speckle/viewerBuilder';
    import UtilityBar from '/src/lib/components/modelViewer/UtilityBar.svelte';

    export let data;

    let speckleStramToPass = '';
	let speckleViewerRunning = '';
	let loadCompleted = false;

	let selectedElement = [];

    //implement onMount function 
	onMount(async () => {
		currentSelection.subscribe((v) => {
		selectedElement = v;
		//console.log('selected element', selectedElement);
		});

		speckleViewer.subscribe((sv) => {
		speckleViewerRunning = sv;
		//console.log('from the store', get(speckleViewer));
		});

		speckleStream.subscribe((v) => {
		speckleStramToPass = v;
		let viewer = get(speckleViewer).speckleViewer;
		//console.log('viewer from page', v);
		if (viewer != null ) {
			reloadViewer(speckleStramToPass);
			viewer.on('load-complete', (arg) => {
                speckleDatatree.set(viewer.getDataTree());
                const dtBuilder = buildViewerData();
				console.log('load comple from page.............', get(speckleParqueLotes));
                
                finishLoading.set(true);
			});
		}
		
	});

	})

</script>
<div class="utility-bar">
    <UtilityBar />
</div>
<div class="speckle-viewer-area">
    
    <SpeckleViewer speckleStream={speckleStramToPass} />
</div>
<style>
    .speckle-viewer-area {
        width: 100%;
        height: full;
    }
    .utility-bar{
        position: absolute;
        top: 1.5em;
        left: 0;

    }
</style>
