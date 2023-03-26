<script>
    //import on mount
    import './../../../css/styles.css'
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
    import {prototypeModel} from '/src/stores/iotStore.js';


    export let chartType;

    
    export let chartInput;
    let fontFamily = 'Poppins';
    let chartValues = [chartInput.valorPair[0],chartInput.valorPair[1]];
	let chartLabels = ['opuesto', 'valor'];
	let ctx;
	let chartCanvas;
    let chart;

    //create a function to process the 

	onMount(async (promise) => {
          

		  ctx = chartCanvas.getContext('2d');
			chart = new Chart(ctx, {
				type: 'doughnut',
				data: {
						labels: chartLabels,
						datasets: [{
								label: 'opuesto',
								backgroundColor: ['rgba(178,223,219,1)','rgba(94,104,121,0.388)'],
								borderColor: 'rgba(178,178,178,1)',
                                borderWidth:0.1,
                                pointRadius:0.1,
								data: chartValues,
                                offset: 5,
                fill:true,
						}]
				},
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            },
            cutout: '75%',
            animations: {
                animateRotate: true,
                animateScale: true
            },
            //animation.animateRotate: true,
        }
		});
	  });

    

</script>

<div class="donout-kpi-holder neomorfic-div">
    <p class="title">{chartInput.chartTitle}</p>
	<canvas bind:this={chartCanvas} />
    <div class="donut-inner">
        <p class="inner-value">{chartInput.kpiVal}</p>
    </div>
</div>

<style>
    .donut-inner {
   margin-top: -2.7em;
   margin-bottom: 2.7em;
}
.donut-inner p {
   margin-bottom: 5px;
   margin-top: 0;
}
canvas {
		z-index: 3;
        width: 120px;
        margin: 0px;
        padding: 5px;
        margin-top: -10px;
	}
.donout-kpi-holder {
		height: 5em;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 4em;
        margin: 0.4em;

	}

p {
        font-size: 0.5em;
        margin: 0;
        padding: 0;
    }
.inner-value{

        font-weight: 600;
        margin: 0;
        padding: 0;
    }
.title{
        font-weight: 600;
        margin: 0;
        padding: 0;
        width: 100px;
        line-height: 1em;
        text-align: center;
    }

</style>
