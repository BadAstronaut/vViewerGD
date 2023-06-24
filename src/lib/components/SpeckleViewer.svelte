<script>
    import { Viewer, ViewerEvent } from "@speckle/viewer";
    import { onMount } from "svelte";
    import * as THREE from 'three';
    import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
    import { get } from "svelte/store";
    import {
      fetchUserData,
      reloadViewerGetObjectsByIds,
      handleBeaconOrigin,
      reloadViewer
    } from "$lib/speckle/speckleHandler";

    import {speckleViewer, finishLoading, currentSelection, speckleDatatree, currentLote, currentProto, sidebar_show} from "../../stores/toolStore";
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
    let labelRenderer ;
    
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
          //console.log(clieckedElement,"clicked!")
        } else { 
          v.resetSelection();
          // @ts-ignore
          currentSelection.set([])
          currentLote.set(null)
          currentProto.set(null)
        }
        //console.log(v.needsRender);
      })
      // @ts-ignore
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
      const speckObj = reloadViewerGetObjectsByIds(
        v,
        speckleStream,
        [],
        []
  
      );
      //console.log("speckleObj",v.speckleRenderer._scene);
      //twoDCard(v);

    });

    function twoDCard(v){
      const scene = v.speckleRenderer._scene
      const earthDiv = document.createElement( 'div' );
				earthDiv.className = 'label';
				earthDiv.textContent = 'Eartttttttttth';
				earthDiv.style.backgroundColor = 'transparent';

				const earthLabel = new CSS2DObject( earthDiv );
				earthLabel.position.set( 1.5, 0, 0 );
				earthLabel.center.set( 100, 100 );
        earthLabel.scale.set( 100, 100, 100 );
				scene.add( earthLabel );
				earthLabel.layers.set(3);
        

        console.log (earthLabel)

        //labelRenderer = new CSS2DRenderer();
				//labelRenderer.setSize( window.innerWidth, window.innerHeight );
				//labelRenderer.domElement.style.position = 'absolute';
				//labelRenderer.domElement.style.top = '0px';
				//document.body.appendChild( labelRenderer.domElement );
        v.requestRender();
    }

  </script>
  
  <div bind:this={viewerVal} class="viewer" />
  
  <style>
    .viewer {
      border-radius: 5px;
      opacity: 0.9;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      min-height: 100vh;
      min-width: 100%;
    }
  </style>