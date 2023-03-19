<script>
//import on mount
import '/src/css/styles.css'
import { onMount } from "svelte";
import LineChart from '$lib/components/charts/LineChart.svelte';

//variables 
export let sensorObj;
export let units;
let maxVal;
let minVal;
let average;
let sensorId;
let sensorData;
let lastUpdated = '2021-05-05 12:00:00';

let temp = {
            sensorId: "NLW01",
            sensorData: [],
            staticTempVals:{
                min: 0,
                max: 10,
                avg: 4,
            },
        }
//on mount function
onMount(() => {
  //get the sensor store object
  console.log(sensorObj, "sensor object ");
  if (sensorObj) {
    console.log("this is sensorObj", sensorObj);
    sensorId = sensorObj.sensorId;
    sensorData = sensorObj.sensorData;
    maxVal = sensorObj.staticTempVals.max;
    minVal = sensorObj.staticTempVals.min;
    average = sensorObj.staticTempVals.avg;

  }
  
});
</script>

<div class="detail-sensor-card neomorfic-div">
 <div class="key-data-div">
    <div class="sensor-kpis">
        <p>Sensor: {sensorId}</p>
        <p>Last Updated: {lastUpdated}</p>
    </div>
    <div class="sensor-kpis">
        <div class="kpi" style="border-right: 1px solid #f9f9fb">
            <p>Max Value:</p>
            <p class= "kpi-val">{maxVal} {units}</p>
        </div>
        <div class="kpi" style="border-right: 1px solid #f9f9fb">
            <p>Min Value:</p>
            <p class= "kpi-val">{minVal} {units}</p>
        </div>
        <div class="kpi">
            <p>Avg Value:</p>
            <p class= "kpi-val">{average} {units}</p>
        </div>
    </div>
 </div>
 <div class="chart-div">
    <LineChart ChartType={units} />
 </div>
</div>

<style>
.detail-sensor-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 5px;
  margin-top: 25px;
  margin: 1px;
  z-index: 1;
}
p {
  font-size: 10px;
  margin: 0;
  padding: 5;
}
.kpi-val{
  font-size: 12px;
  font-weight: bold;
}
.sensor-kpis{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 3px;
    margin: 1px;
    z-index: 1;
}
.kpi{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: auto;
    padding: 3px;
    margin: 1px;
    z-index: 1;
}
</style>