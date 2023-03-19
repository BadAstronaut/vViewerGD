<script>
	/** @type {import('./$types').PageData} */
	import { ViewerEvent } from '@speckle/viewer';
	import SpeckleViewer from '$lib/components/SpeckleViewer.svelte';
	import DragWindow from '$lib/components/DragWindow.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import DImage from '../../../lib/components/DImage.svelte';
	import ModelPropertyTable from '$lib/components/ModelPropertyTable.svelte';
	import { get } from 'svelte/store';
	import { reloadViewer } from '$lib/speckle/speckleHandler';
	import { speckleStream, speckleViewer, currentSelection } from '../../../stores/toolStore';
	import DragWindowLoader from '$lib/components/DragWindowLoader.svelte';
	export let data;
	let speckleStramToPass = '';
	let speckleViewerRunning = '';
	let loadCompleted = false;

	let selectedElement = [];

	currentSelection.subscribe((v) => {
		selectedElement = v;
		console.log('selected element', selectedElement);
	});

	speckleViewer.subscribe((sv) => {
		speckleViewerRunning = sv;
		console.log('from the store', get(speckleViewer));
	});

	
	speckleStream.subscribe((v) => {
		speckleStramToPass = v;
		let viewer = get(speckleViewer).speckleViewer;
		console.log('viewer from page', data);
		if (viewer != null) {
			reloadViewer(speckleStramToPass);
			viewer.on('load-complete', (arg) => {
				console.log('load comple from page.............', data);
			});
		}
		
	});

	const wait = () => new Promise((res) => setTimeout(res, 2000));
</script>

<div class="panel-left">
	<div class="kpi-panel-left">
		<KpiCard> </KpiCard>
		<KpiCard> </KpiCard>
		<KpiCard> </KpiCard>


	</div>
	<DImage></DImage>
</div>

<div class="center-panel">
	<div class="panel-top">
		<p>panel b</p>
	</div>
	{#await wait()}
		<span aria-busy="true">Loading...</span>
	{:then a}
		<div class="viewer-container">
			<DragWindowLoader />
			<SpeckleViewer speckleStream={speckleStramToPass} />
		</div>
	{/await}


</div>

<div class="panel-right">
	<ModelPropertyTable />
</div>

<style>
	:root {
		--primary: #546e7a;
	}
	.center-panel {
		flex-grow: 2;
		margin: 0;
		padding: 0;
		min-height: inherit;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: start;
	}
	.viewer-container {
		margin: 0px;
		flex-grow: 2;
		width: 100%;
		overflow: hidden;
		border-style: double;
		border-color: whitesmoke;
	}
	.kpi-panel-left {
		width: 100%;
		height: 40vh;
		overflow: hidden;
		/* border-style: double;
		border-color: aqua; */
		display: flex;
		flex-direction: row;
		align-content: flex-start;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: space-between;
	}

	.panel-left {
		background-color:transparent;
		width: 20vw;
		margin: 10px;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.panel-top {
		background-color: #c9d8df;
		height: 20vh;
		width: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.panel-bottom{
		background-color: #f1f7bb;
		height: 20vh;
		width: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.panel-right{
		background-color: lightgoldenrodyellow;
		width: 20vw;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		align-items: top;
	}
</style>
