<script>
  import { draggable } from "@neodrag/svelte";
  import { draggables, speckleViewer,  finishLoading} from "/src/stores/toolStore";
  import { get } from "svelte/store";

  export let dragId;
  export let title;
  let closeIcon = "/icons/x.svg";
  let parentLoaded = false;
  let boundElement = null;
  finishLoading.subscribe((v) => {
    if (v){
      parentLoaded = true;
      let viewer = get(speckleViewer).speckleViewer;
      boundElement = viewer.container;
      console.log(boundElement, "bound")
    }
    else{
      parentLoaded = false;
    }
  });

  function closeWin() {
    let dataToSet = get(draggables);
    let updated = [];
    //filter list by id = Sensor, change active to true
    dataToSet.map((ob) => {
      if (ob.id === dragId) {
        let newOb = { id: dragId, name: ob.name, active: false };
        updated.push(newOb);
      } else {
        updated.push(ob);
      }
    });
    if (updated.length > 0) {
      draggables.set(updated);
    }
    //console.log(get(draggables), "floating");
  }

  //you will need a store for this windows. and 
  //some code like this https://svelte.dev/repl/28996f04783542ceafed7cc6a85128b9?version=3.23.0
</script>

{#if parentLoaded}
<div class="drag-div" use:draggable = {{bounds:'parent'}}>
  <div class="dragg-area" >
    <p class="title">{title}</p>
    <button class="close" on:click={closeWin}>
      <img src={closeIcon} alt="" class="close-button"/>
    </button>
  </div>
  
  <slot />
</div>
{/if}

<style> 
  .title{
    margin-left: 0.6vw;
    margin-top: 0.1vw;
    font-size: 0.55em;
  }
  .close-button{
    width: 5px;
    height: auto;
    margin: 0px;
    padding: 0px;
  }
  .close {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    z-index: 3;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: whitesmoke;
    font: inherit;
    cursor: pointer;
    margin-right: 0.2vw;
    margin-top: 0.2vw;
    padding: 0;
  }

  .close:focus {
    outline: solid 0 transparent;
    box-shadow: 0 0 0 2px whitesmoke;
  }

  .close:hover {
    background: lightpink;
  }
  .dragg-area{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 1em;
    width: 100%;
    padding-bottom: 0.5em;
  }

  .drag-div {
    width: 12em;
    height: 5em;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    margin-left: 100px;
    margin-top: 100px;
  }
</style>
