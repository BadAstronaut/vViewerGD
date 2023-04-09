<script>
    import {getContext, onMount, onDestroy} from 'svelte';
    import '/src/css/styles.css'
    import {finishLoading} from '/src/stores/toolStore';
    
    export let icon 
    export let toExecute;
    export let active;
    let _activeControler = false;
    let expanded ;

    finishLoading.subscribe((v) => {
        expanded = v;
    });
    function controlExecution(){
        if (active) {
            console.log(_activeControler);
            _activeControler = !_activeControler
        }
        
        toExecute();
    }
    //onDestroy(expanded);
    </script>
    <span class="tooltip">Github</span>
    <button id="toolbarButton" aria-expanded={expanded} aria-haspopup="true" on:click={controlExecution} class="tool-bar-button neomorfic-div neomorfic-div-hover" class:active={_activeControler}>
         <img class="button-icon" src={icon} alt="" /> 
    </button>
    
    <style>
    
    
        .tooltip{
            position: absolute;
            top: 0;
            font-size: 8px;
            background: #ffffff;
            color: #ffffff;
            padding: 5px 8px;
            border-radius: 5px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .tooltip::before {
            position: absolute;
            content: "";
            height: 8px;
            width: 8px;
            bottom: -3px;
            left: 50%;
            transform: translate(-50%) rotate(45deg);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            background: #1877F2;
            color: #ffffff;
        }
    
        .tool-bar-button{
            position: relative;
            border-radius: 50%;
            border-width: 0px;
            padding: 1px;
            margin: 1px;
            width: 1.8em;
            height: 1.8em;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1); */
            cursor: pointer;
            /* transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); */
    
        }
        .active{
            background-color:lightblue;
        }
    
    
        .tooltip:hover{
            top: -2px;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            background: #1877F2;
            color: #ffffff;
        }
    </style>