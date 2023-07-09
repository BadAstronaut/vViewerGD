<script>
	//import on mount
	import './../../../css/styles.css';
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { changeElementColorByIds } from '$lib/speckle/speckleHandler.js';
	import { colorValueDisponibility, viewerLotes } from '/src/stores/toolStore.js';
	Chart.register(...registerables);

	export let dataProp;
	let dataList;
	export let tittle;

	let fontFamily = 'Poppins';
	let chartValues = [];
	let chartLabels = [];
	let ctx;
	let chartCanvas;
	let chart;
	let disponibleValue = '';
	//create a function to process the
	//this is the only way to update the chart, if we subscribe to the parent level
	//the value is not updated in the component
	viewerLotes.subscribe((v) => {
		//console.log('from the store', v);
		dataList = v;
		const chartData = getChartArray();
		//console.log('chartDataddd', chartData);
		if (chartData.length > 0) {
			chartData.forEach((item) => {
				chartLabels.push(item.label);
				chartValues.push(item.value);
			});
			//get the value of the chartData object that has label disponible
			let disponibleIndex = chartData.findIndex((obj) => obj.label === 'Disponible');
			disponibleValue = chartData[disponibleIndex].value;

			//console.log(chartLabels, chartValues, 'charting .... ');
			if (chart) {
				chart.update();
			}
		}
	});
	onMount(async (promise) => {
		//console.log('dataList comes empty somethinmes ? ', dataList);
		ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Estado',
						backgroundColor: [
							'rgba(192,102,111,0.6)',
							'rgba(111,192,102,0.6)',
							'rgba(102,111,192,0.6)'
						],
						borderColor: 'rgba(94,104,121,0.388)',
						borderWidth: 0.1,
						pointRadius: 0.1,
						data: chartValues,
						offset: 5,
						fill: true
					}
				]
			},
			options: {
				onClick: handleClick,
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					}
				},
				cutout: '75%',
				animations: {
					animateRotate: true,
					animateScale: true
				}
				//animation.animateRotate: true,
			}
		});
	});

	//create a function that extract an array of unique values from the dataList using the dataProp as filter counting how many occurrencies there area
	function getChartArray() {
		let chartUi = {
			label: '',
			value: '',
			ids: []
		};
		let chartArray = [];
		//console.log('dataList', dataList);
		if (dataList && dataList.length > 0) {
			dataList.forEach((item) => {
				//console.log("item", item);
				if (item[dataProp] != null) {
					//check if the value item[dataProp]  is in any of the objects in chartArray
					let index = chartArray.findIndex((obj) => obj.label === item[dataProp]);
					if (index === -1) {
						//if not, create a new object and push it to the array
						chartUi.label = item[dataProp];
						chartUi.value = 1;
						chartUi.ids.push(item.id);
						chartArray.push(chartUi);
						chartUi = {
							label: '',
							value: '',
							ids: []
						};
					} else {
						//if it is, increase the value of the object
						chartArray[index].value += 1;
						chartArray[index].ids.push(item.id);
					}
				}
			});
		}
		//sort chartArray by value
		chartArray.sort((a, b) => (a.value > b.value ? -1 : 1));
		//console.log(dataList, 'chartArray');
		return chartArray;
	}
	function handleClick(event, elements) {
		if (elements.length > 0) {
			let segmentIndex = elements[0].index;
			let segmentLabel = chart.data.labels[segmentIndex];
			//get the color from the colorValueDisponibility store based on the segment label
			let color = getColorByKey(segmentLabel);
			//console.log('color', color);
			//get the ids based on the Estado property from the dataList
			let ids = dataList.filter((item) => item[dataProp] === segmentLabel).map((item) => item.id);
			//console.log('Clicked on segment:', ids);
			changeElementColorByIds(ids, color);
		}
	}
	function getColorByKey(key) {
		let color;
		colorValueDisponibility.subscribe((values) => {
			if (key in values) {
				color = values[key];
			}
		});
		return color;
	}
</script>

<div class="donout-kpi-holder">
	<p class="title">{tittle}</p>
	<div class="canvas-holder">
		<canvas bind:this={chartCanvas} />
		<div class="donut-inner">
			<p class="inner-value">{disponibleValue}</p>
		</div>
	</div>
</div>

<style>
	.donut-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px;
	}
	canvas {
		z-index: 3;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
	}
	.canvas-holder {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		margin-top: 2rem;
	}
	.donout-kpi-holder {
		height: 12em;
		position: absolute;
		left: 2em;
		bottom: 1.5em;
		width: 12em;
		margin: 0.4em;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		gap: 0.5em;
	}

	p {
		margin: 0;
		padding: 0;
	}
	.inner-value {
		font-weight: 600;
		font-size: 2.5em;
		margin: 0;
		padding: 0;
	}
	.title {
		font-weight: 600;
		font-size: 1em;
		text-align: center;
	}
</style>
