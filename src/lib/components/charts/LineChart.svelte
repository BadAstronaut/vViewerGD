<script>
    import { Chart, registerables } from 'chart.js';
    import zoomPlugin from 'chartjs-plugin-zoom';
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
    import {prototypeModel} from '/src/stores/iotStore.js';
    import { onMount } from 'svelte';

    let iotHolder;
    prototypeModel.subscribe((data)=>{
      console.log(data);
      iotHolder = data;
    });

    export let ChartType;
    let fontFamily = 'Poppins';
    let chartValues = [20, 10, 5, 2, 20, 30, 45];
	  let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	  let ctx;
	  let chartCanvas;
    let chart;

	  onMount(async (promise) => {
		  ctx = chartCanvas.getContext('2d');
			chart = new Chart(ctx, {
				type: 'line',
				data: {
						labels: chartLabels,
						datasets: [{
								label: '',
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
                borderWidth:2,
                pointRadius:2,
								data: chartValues,
                fill:true,
                tension: 0.1
						}]
				},
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              zoom: {
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'xy'
                  }
              },
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.4)', // set background color to transparent black
                titleColor: '#FFFFFF', // set title color to white
                titleFont: {
                  family: fontFamily,
                  size: 8
                },
                bodyColor: '#FFFFFF', // set body color to white
                bodyFont: {
                  family: fontFamily,
                  size: 8
                },
                displayColors: false,
                padding: 5
          }
        },
        scales:{
            x: {
              ticks: {
                color: '#8d93a7',
                font: {
                  family: fontFamily,
                  size: 10
                }
              },
          },
          y: {
            ticks: {
              color: '#8d93a7',
              font: {
                family: fontFamily,
                size: 10
              }
            },
          }
        }
        }
		});
	  });
    let iotvals;
    let iotlabs;
    $: if (chart) {
      
      if (ChartType =="C") {
        //iotvals = iotHolder.chartData.temperature.values;
        iotvals = chartValues;
        //iotlabs = iotHolder.chartData.temperature.labels;
        iotlabs = chartLabels;
        //console.log("holding",iotlabs);
        chart.data.datasets[0].data = iotvals; // update the data
        chart.data.datasets[0].backgroundColor = "rgb(79, 173, 175,0.5)"; // update the data
        chart.data.datasets[0].borderColor = "rgb(79, 173, 175,0.7)"; // update the data
        chart.data.labels = iotlabs; // update the data
        //console.log(chart.data.labels);
        chart.update(); // notify chart.js to render the new data
      } else if (ChartType =="humidity") {
        iotvals = iotHolder.chartData.humidity.values;
        iotlabs = iotHolder.chartData.humidity.labels;
        //console.log("holding",iotlabs);
        chart.data.datasets[0].data = iotvals; // update the data
        chart.data.datasets[0].label = "Humedad"; // update the data
        chart.data.datasets[0].backgroundColor = "rgb(56, 121, 149, 0.5)"; // update the data
        chart.data.datasets[0].borderColor = "rgb(56, 121, 149, 0.7)"; // update the data
        chart.data.labels = iotlabs; // update the data
        //console.log(chart.data.labels);
        chart.update(); // notify chart.js to render the new data
      }
    
  }

</script>

<div class="chartHolder">
	<canvas bind:this={chartCanvas} />
</div>

<style>
	canvas {
		margin: 0.3em;
    z-index: 3;
    
	}
	.chartHolder {
		height: 6em;
	}
</style>
