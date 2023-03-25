<script>
    import {sphereByIDList} from '$lib/animation/SphereByIDList';
    import { get } from 'svelte/store';
    import '/src/css/styles.css'
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import DetailSensorCard from './DetailSensorCard.svelte';
    import { draggables, speckleViewer, finishLoading } from '/src/stores/toolStore';

    let active = 'Home';
    let tabs = ['Temp.', 'Hum.'];
    let parentLoaded = false;
    let rawDataObject = [
        {
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
        },
        {
            sensorId: "NLW02",
            sensorData: [],
            staticTempVals:{
                min: 0,
                max: 10,
                avg: 4,
            },
            staticHumVals:{
                min: 0,
                max: 30,
                avg: 4,
            },
        }
        
    ]
    
    finishLoading.subscribe((v) => {
		if (v) {
			parentLoaded = true;
			let viewer = get(speckleViewer).speckleViewer;
			v = viewer;
            let sphere= sphereByIDList(viewer, "67ffed8adbcaba8ccaa8021b8897dfec")
			console.log(sphere.geometry, 'sphere to animate');
			//createLine(point1, point2, viewer);
			//console.log(drawLine, 'drawline');
			// gsap.to(drawLine.scale, {
			// 	x: 3,
			// 	duration: 1,
			// 	repeat: '-1',
			// 	yoyo: true,
			// 	onUpdate: () => {
			// 		viewer.requestRender();
			// 	}
			// });
		} else {
			parentLoaded = false;
		}
	});

</script>

<div class="sensor-detail-panel glassmorphism">
    <div>
        <!--
          Note: tabs must be unique. (They cannot === each other.)
        -->
        <TabBar tabs={tabs} let:tab bind:active>
          <!-- Note: the `tab` property is required! -->
          <Tab class="custom-tab" {tab} minWidth >
            <Label>{tab}</Label>
          </Tab>
        </TabBar>
        <!--
          implement if logic to display different charts based on the active tab
        -->
        {#if active === 'Temp.'}
            <!-- <LineChart ChartType={"temperature"} /> -->
            <DetailSensorCard sensorObj={rawDataObject[0]} units="C"></DetailSensorCard>
        {:else if active === 'Hum.'}
            <!-- <LineChart ChartType={"humidity"} /> -->
        {/if}
        
       
       
        
      </div>
</div>


<style>
:global(.custom-tab){

    font-size: 8px;
    margin: 2px;
    padding: 5px;
    height: auto;
    width: 100%;
}
.sensor-detail-panel{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
}

</style>
