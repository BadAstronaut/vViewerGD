<script>
  import DragWindow from "./DragWindow.svelte";
  import SensorDetailPanel from "./sensorsDetailPanel/SensorDetailPanel.svelte";
  import { draggables, speckleViewer, finishLoading } from '/src/stores/toolStore';
  //import LineChart from "../lineChart.svelte";
  //import { prototypeModel } from "../../lib/stores/iotStore.js";
  // import {
  //   fetchIoTData,
  //   fetchSensorData,
  //   kpiProcesor,
  // } from "../../lib/iot/fetchData";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
	import { construct_svelte_component } from "svelte/internal";
  // these are our 'items' saved to our Svelte store
  let storeFE;
  //temp store for testing 
  let _storeFE=[{ id:'SensorDetailPanel', name: 'Sensor Detail Panel', active:true }];
  let sensorObj;
  //turn of when walmart draggables are loaded.
  let control;
  //implement on mount function 
  onMount(() => {
    control = true;
  });

  draggables.subscribe((val) => {
    //console.log("from drag og",val);
    let _control = val.filter((ob) => {
      //load the drag window only if the sensor detail panel is active
      return ob.id === "SensorDetailPanel";
    });
    //console.log(_control[0].active)
    if (_control[0].active) {
      control = true;
    } else{
      control = true;
      console.log("this is control", control);
    //get the sensor store object
    // sensorObj = val.filter((ob) => {
    //   return ob.id === "Sensor";
    // });
    // let loadSensorData = fetchSensorData("NLW01");
    // loadSensorData.then((data) => {
    //   //console.log("im from drag store", data);
    //   prototypeModel.set(kpiProcesor(data));
    //   console.log("from the prototype    ", get(prototypeModel));
    // });

    storeFE = val;
    console.log("from drag store", storeFE);
    }
    
  });

  function loadDrag() {}
</script>

{#if control}
  {#each _storeFE as item}
    {#if item.active}
      <DragWindow dragId={item.id} title={item.name} windowWidth = {15} windowHeight={"auto"}>
        <SensorDetailPanel />
        <!-- here we will implement logic for different drag windows -->
        <!-- {#if item.id == "Sensor"}
          <LineChart ChartType={"temperature"} />
        {:else if item.id == "SensorHum"}
          <LineChart ChartType={"humidity"} />
        {/if}
          -->

      </DragWindow>

    {/if}
  {/each}
{/if}
