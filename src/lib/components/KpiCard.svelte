<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { getKPIVariation } from '$lib/dataModeling/dashboardUtilities.js';
	//use this icons https://www.svgrepo.com/collection/duotone-circled-icons/
	export let icon = '/icons/kpis/water-fee.svg';
	export let title = 'T Max';
	export let kpiValue = '28';
	export let kpiUnit = '°';
	//variation will be a number positive or negative, if positive color green if negative color red
	export let kpiVariation = 0.05;
	let kpiVariationObject = getKPIVariation(kpiVariation);
	console.log(kpiVariationObject);
</script>

<div class="kpi-card">
	<div class="title">
		<h5>{title}</h5>
		<img src={icon} alt="icon" />
	</div>
	<div class="values-center">
		<h4>{kpiValue}</h4>
		<h6>{kpiUnit}</h6>
	</div>
	<div class="values-lower">
		{#if kpiVariationObject.kpiVariationDirection == 'up'}
			<p style="color: #77be9c;">{kpiVariationObject.kpiPercentage}</p>
		{:else}
			<p style="color: red;">{kpiVariationObject.kpiPercentage}</p>
		{/if}

		<img src={kpiVariationObject.kpiIcon} alt="" />
		<p>{kpiVariationObject.kpiDescription}</p>
	</div>
</div>

<style>
	h4 {
		font-size: 0.75em;
		margin: 0%;
		padding: 0;
	}
	h5 {
		font-size: 0.65em;
		margin: 0%;
		padding: 0;
	}
	h6 {
		font-size: 0.6em;
		margin: 0%;
		padding: 0;
	}
	p {
		font-size: 0.45em;
		margin: 0%;
		padding: 0;
	}

	.kpi-card {
		background-color: #ffffff;
		width: 45%;
		height: 60px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		margin: 5px;
	}
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px;
		max-height: 30%;
	}
	.values-center {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 10px;
		width: 100%;
		padding: 0 10px;
		max-height: 30%;
	}
	.values-lower {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 3px;
		width: 100%;
		margin-top: 3px;
		padding: 0 10px;
		max-height: 30%;
	}
</style>
