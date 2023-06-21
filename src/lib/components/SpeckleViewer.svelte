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
    import {speckleViewer, finishLoading, currentSelection, speckleDatatree} from "../../stores/toolStore";
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
    
    onMount(() => {
      //console.log('viewer dynamic update' , speckleStreams[idUpdate]);
      v = new Viewer(viewerVal);
      //console.log(v);
      v.on(ViewerEvent.ObjectClicked ,(args)=>{
        if (args) {
          //console.log(args,"clicked");
          //this changed not sure why  args.userData.id
          const clieckedElement = args.hits[0].object
          v.selectObjects([clieckedElement.id])
          
          // @ts-ignore
          currentSelection.set([clieckedElement])
          console.log(clieckedElement,"clicked!")
        } else { 
          v.resetSelection();
          // @ts-ignore
          currentSelection.set([])
        }
        //console.log(v.needsRender);
        
         
        
  
      })
      // @ts-ignore
      speckleViewer.set({'speckleViewer':v})

      // import the data tree store and save it in here 
      //console.log("viewer store set",get(speckleViewer) )
      v.setLightConfiguration({
        azimuth: 0.55,
        castShadow: true,
        color: 16777215,
        elevation: 1.33,
        enabled: true,
        indirectLightIntensity: 1.2,
        intensity: 9,
        radius: 0,
      });
      //console.log("viewer here.....", speckleStream);
      //let branch =  fetchStreamData(speckleStreams.NLW01);
      let userD = fetchUserData();
      //console.log("user data");
      //Espacio Colaborativo 
      //console.log("user data lost", v);
      const speckObj = reloadViewerGetObjectsByIds(
        v,
        speckleStream,
        [],
        []
  
      );

    });

  </script>
  
  <div bind:this={viewerVal} class="viewer" />
  
  <style>
    .viewer {
      border-radius: 5px;
      opacity: 0.9;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      min-height: 100%;
      min-width: 100%;
    }
  </style>