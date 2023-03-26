<script>
//import on mount
import '/src/css/styles.css'
import LinearProgress from '@smui/linear-progress';
import { onMount} from "svelte";
import { get } from 'svelte/store';
import LineChart from '$lib/components/charts/LineChart.svelte';
import {baseIoTUnits} from '/src/stores/iotStore';

//variables 
export let sensorObj;
export let sensorId;
export let units;

let maxVal;
let minVal;
let average;
let sensorData;
let lastUpdated = '2021-05-05 12:00:00';
let iotData ;
let unitVal ;

let tempVal = {
            sensorId: "NLW01",
            sensorData: [],
            staticTempVals:{
                min: 0,
                max: 10,
                avg: 4,
            },
            staticHumVals:{
                min: 0,
                max: 10,
                avg: 4,
            },
        }

let finishLoadingData = false;

//implement fetch function to load sensor data from endpoint async 
async function fetchSensorData (_sensorId) {
   const r =await fetch(`/api/iotSensors/iotGetSensorById/?sensorId=${_sensorId}`)
  .then(response => response.json())
  return r
}

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
onMount(async() => {
  //get the sensor store object
  console.log(sensorId, "sensor object ");
  unitVal = get(baseIoTUnits)[units];
    //console.log(unitVal['temperature'], "unit val.......");
  if(sensorId){

    iotData = await fetchSensorData(sensorId);
    finishLoadingData = true;
    console.log(iotData, "iot data");
    maxVal = iotData.maxT;
    minVal = iotData.minT;
    average = iotData.weeklyHChange;
    sensorData = iotData.rawData;

  }

  // if (sensorObj) {
  //   console.log("this is sensorObj", sensorObj);
  //   //sensorId = sensorObj.sensorId;
  //   sensorData = sensorObj.sensorData;
  //   maxVal = sensorObj.staticTempVals.max;
  //   minVal = sensorObj.staticTempVals.min;
  //   average = sensorObj.staticTempVals.avg;

  // }
  
});
</script>

<div class="detail-sensor-card neomorfic-div">
  {#if finishLoadingData}
  <div class="key-data-div">
    <div class="sensor-kpis">
        <p>Sensor: {sensorId}</p>
        <p>Last Updated: {lastUpdated}</p>
    </div>
    <div class="sensor-kpis">
        <div class="kpi" style="border-right: 1px solid #f9f9fb">
            <p>Max Value:</p>
            <p class= "kpi-val">{maxVal} {unitVal}</p>
        </div>
        <div class="kpi" style="border-right: 1px solid #f9f9fb">
            <p>Min Value:</p>
            <p class= "kpi-val">{minVal} {unitVal}</p>
        </div>
        <div class="kpi">
            <p>Var. Semanal:</p>
            <p class= "kpi-val">{average} {unitVal}</p>
        </div>
    </div>
 </div>
 <div class="chart-div">
    <LineChart chartData={sensorData} ChartType={'temperature'} />
 </div>
  {:else}
    <div class="loading-data">
      <LinearProgress style='width: 75%;' indeterminate />
    </div>
    
  {/if}
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
.loading-data{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2em;
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