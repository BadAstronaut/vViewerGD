<script>
	import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { reloadViewer } from '$lib/speckle/speckleHandler';
	import {
		finishLoading,
		viewerProtos,
		viewerLotes,
		sidebar_show,
        currentSelection,
        currentLote,
        currentProto,
	} from '/src/stores/toolStore';
	import { SpriteMaterial } from 'three';

	export let show = false;
	let modal_show = false;
    let proto = get(currentProto);
    let lote = get(currentLote);

    currentLote.subscribe((v) => {
        lote = v;
        proto = null;
    });
    currentProto.subscribe((v) => {
        const loteId= v?.LoteID;
        //get lote with teh same loteId
        const _lote = get(viewerLotes).find((item) => item.LoteID === loteId);
        const lote = _lote ? _lote : null;
        console.log("-------", lote)
        proto = v;
    });



	
</script>

{#if show}
	<nav transition:fly={{ x: 250, opacity: 1 }}>
        
        {#if lote}
        <div class="side-container">
            <span>Prototipo :{lote.LoteID}</span>
        </div>
        {/if}

        {#if proto}
        <div class="side-container">
            <span>Prototipo :{proto.Nombre}</span>
        </div>
        {/if}
	</nav>
{/if}

<style>
    .side-container{
        display: flex;
        flex-direction: column;
        align-items: start;
        border: 1px solid black;
        justify-content: flex-start;
        gap: 5px;
        height: 50%;
        width: 100%;
    }
	nav {
		position: absolute;
		top: 0;
		right: 0;
		height: 95vh;
		padding: 2rem 1rem 0.6rem;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		width: 20rem;
		display: flex;
		flex-direction: column;
		align-items: start;
        justify-content: flex-start;
		z-index: 3;
		border-radius: 5px;
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
		margin-top: 1vh;
		gap: 5px;
	}
</style>
