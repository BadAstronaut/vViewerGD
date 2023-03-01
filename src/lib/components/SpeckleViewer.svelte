<script>
    import { Viewer, ViewerEvent } from "@speckle/viewer";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import {
      fetchUserData,
      reloadViewerGetObjectsByIds,
      handleBeaconOrigin,
      reloadViewer
    } from "$lib/speckle/speckleHandler";

    //import { speckleViewer} from "$app/stores/toolStore";
    import {speckleViewer, finishLoading, currentSelection} from "../../stores/toolStore";
    export let speckleStream;
    //const speckleViewer = toolStore.speckleViewer
    //console.log(toolStore.speckleViewer)

    let viewerVal;
    let maxRad = 4;
    let rad = 0.1;
    let opa = 1;
    let spheres = [];
    let v;
    let coor = [];

  
  
    // prototypeModel.subscribe((data)=>{
    //   idUpdate = data.sensorId;
    //   //console.log(v,"speckel data ");
    //   if (v) {
    //     reloadViewerGetObjectsByIds(v,speckleStreams[idUpdate]);
    //   }
  
    // });
    // speckleObjects.subscribe((obj)=>{
    //   if (v ) {
    //     console.log(obj.speckleEls)
    //     let objectUniverse=obj.speckleEls.map((f)=>{
    //       console.log('did my selection changed',f.id)
    //       return f.id
    //     })
    //     console.log(objectUniverse)
    //     v.selectObjects(objectUniverse);
    //   }
      
      
    // })
    
    onMount(() => {
      //console.log('viewer dynamic update' , speckleStreams[idUpdate]);
      v = new Viewer(viewerVal);
      console.log(v);
      v.on(ViewerEvent.ObjectClicked ,(args)=>{
        if (args) {
          //console.log(args,"clicked");
          //this changed not sure why  args.userData.id
          const clieckedElement = args.hits[0].object
          v.selectObjects([clieckedElement.id])
          
          // @ts-ignore
          currentSelection.set([clieckedElement])
        } else { 
          v.resetSelection();
          // @ts-ignore
          currentSelection.set([])
        }
        //console.log(v.needsRender);
        
         
        
  
      })
      // @ts-ignore
      speckleViewer.set({'speckleViewer':v})
      //console.log("viewer store set",get(speckleViewer) )
      v.setLightConfiguration({
        azimuth: 0.55,
        castShadow: false,
        color: 16777215,
        elevation: 1.33,
        enabled: true,
        indirectLightIntensity: 1.2,
        intensity: 9,
        radius: 0,
      });
      //console.log("viewer here", v);
      //let branch =  fetchStreamData(speckleStreams.NLW01);
      let userD = fetchUserData();
      //Espacio Colaborativo
      const speckObj = reloadViewerGetObjectsByIds(
        v,
        speckleStream,
        [],
        []
  
      );
  
      const pResolve = Promise.resolve(speckObj);
      pResolve.then((res) => {
        //coor.push(res[1][0])
        //speckleObjects.set({ speckleEls: res });
        //console.log('objets',get(speckleObjects));
  
        // addGeo();
        // animate();
        // getSpeckleLocation();
        //console.log("Data Tree:", spheres);
      });
    });
  
    function getSpeckleLocation() {
      //i have a Revit Element ID.
      //1 I need the Speckle element that has that id
      //2 I need to get the basepoint properties of that speckle object
      let filterB = { type: "NLW01_SA001" };
      const sensorRevitId = "f25a8ea80f73e368311f1887adda3162";
      //console.log(v.sceneManager.allObjects);
    }
  </script>
  
  <div bind:this={viewerVal} class="viewer" />
  
  <style>
    .viewer {
      border-radius: 5px;
      opacity: 0.9;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      min-height: 100%;
    }
  </style>