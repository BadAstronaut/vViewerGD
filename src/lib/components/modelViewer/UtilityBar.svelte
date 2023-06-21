<script>
import ToolBarButton from "./ToolBarButton.svelte";
import { get } from "svelte/store";
import {sphereByIDList} from "/src/lib/animation/SphereByIDList.js";
import {activeIoTIndicators, speckleViewer, finishLoading, viewerLotes, speckleParqueLotes} from "/src/stores/toolStore.js";
import {selectElementsByPropNameValue, resetViewerFilters} from "/src/lib/speckle/speckleHandler.js"


let setTopView ='/icons/top.svg';
let homeView ='/icons/home-2.svg';

let colorByProperty ='/icons/traffic-lights.svg';
let filterOff ='/icons/filter-off.svg';




let tempObjectIds = ["ee07ac99d4cfd23c59ef94bda65bdbe0","ccb4b5e5bf2ae2bfb1524e62462155d2"];
//this function will create the spheres to be assign and hide the elements
function setTop(){
    const activeV = get(speckleViewer);
    //console.log("activeV",activeV);
    console.log(activeV, get(finishLoading), "cosonle log ");
    if(activeV.speckleViewer && get(finishLoading)){
        activeV.speckleViewer.setView('top',true);
        activeV.speckleViewer.zoom([],0.75)
        console.log(activeV, "cosonle log ");
        //console.log("showing sensor animation",get(activeIoTIndicators));
    }
}
function setHome(){
    const activeV = get(speckleViewer);
    //console.log("activeV",activeV);
    console.log(activeV, get(finishLoading), "cosonle log ");
    if(activeV.speckleViewer && get(finishLoading)){
        activeV.speckleViewer.setView('3D', true);
        activeV.speckleViewer.zoom([],0.5)
        console.log(activeV, "cosonle log ");
        //console.log("showing sensor animation",get(activeIoTIndicators));
    }
}

//create a function that isole and filter ofjects based on propertyes 
function colorByPropertyAvailability(){
    const activeV = get(speckleViewer).speckleViewer;
    const specklePropName = "passportID";
    const disponibles = []
    const ocupados = []
    const reservados = []
    if(activeV && get(finishLoading)){
        const lotes = get(viewerLotes)
        //get groups of elements ids based on the state property
        lotes.forEach(lote => {
            if(lote.Estado == "Disponible"){
                disponibles.push(lote.id)
            }else if(lote.Estado == "Ocupado"){
                ocupados.push(lote.id)
            }else if(lote.Estado == "Reservado"){
                reservados.push(lote.id)
            }
        });
        const dispQueryObject = {
            objectIds: disponibles,
            color: 0x6fc066
        }
        const ocupQueryObject = {
            objectIds: ocupados,
            color: 0xc0666f
        }
        const resQueryObject = {
            objectIds: reservados,
            color: 0x666fc0
        }
        console.log("states of color disponible and ocupado",disponibles, ocupados);
        activeV.setUserObjectColors([ocupQueryObject,dispQueryObject])
        //activeV.setUserObjectColors([dispQueryObject])

        //need to get all the speckle elements that have the property of passport and filter them
        //const Selements = selectElementsByPropNameValue(specklePropName,passport.passportID)
        //console.log("activeV",Selements);

    }
    
}
function removeFilterViewer (){
    resetViewerFilters();
}


</script>

<div class="utility-bar" > 
<ToolBarButton icon={setTopView} toExecute={setTop} active={false} />
<ToolBarButton icon={homeView} toExecute={setHome} active={false} />
<ToolBarButton icon={colorByProperty} toExecute={colorByPropertyAvailability} active={false} />
<ToolBarButton icon={filterOff} toExecute={removeFilterViewer} active={false} />


</div>

<style>
    .utility-bar {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3;
      border-radius: 5px;
      /* From https://css.glass */
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      width: 2.5em;
      margin-top: 15px;
      gap: 5px;
      padding-left: 5px;
      padding-bottom: 10px;
    }
</style>