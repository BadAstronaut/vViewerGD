<script>
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import DetailSensorCard from './DetailSensorCard.svelte';
    let active = 'Home';
    let tabs = ['Temp.', 'Hum.'];
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

</script>

<div class="sensor-detail-panel">
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
    background-color: #fff;
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
