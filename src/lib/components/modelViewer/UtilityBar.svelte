<script>
import ToolBarButton from "./ToolBarButton.svelte";
import { get } from "svelte/store";
import {sphereByIDList} from "/src/lib/animation/SphereByIDList.js";
import {activeIoTIndicators, speckleViewer, finishLoading} from "/src/stores/toolStore.js";


let sensorDataIcon ='/icons/cloud-computing.svg';


let tempObjectIds = ["ee07ac99d4cfd23c59ef94bda65bdbe0","ccb4b5e5bf2ae2bfb1524e62462155d2"];
//this function will create the spheres to be assign and hide the elements
function showSensorAnimation(){
    const activeV = get(speckleViewer);
    console.log("activeV",activeV);
    if(activeV.speckleViewer && get(finishLoading)){
        const spheres = sphereByIDList(activeV.speckleViewer,tempObjectIds);
        activeIoTIndicators.set(spheres);
        //console.log("showing sensor animation",get(activeIoTIndicators));
    }
    
}


</script>

<div class="utility-bar" > 
<ToolBarButton icon={sensorDataIcon} toExecute={showSensorAnimation} active={false} />
</div>

<style>
    .utility-bar {
      position: absolute;
      display: flex;
      flex-direction: row;
      align-items: center;
      z-index: 3;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      /* From https://css.glass */
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      width: 15.5em;
      height: 2.5em;
      margin-left: 15px;
      margin-top: 15px;
      gap: 5px;
      padding-left: 5px;
    }
</style>