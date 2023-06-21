<script>

import { fade } from 'svelte/transition';

let lotes = get(viewerLotes);
let protos = get(viewerProtos);
let proto = null;
let lote = null;

function overlay_click(e) {
    if ('close' in e.target.dataset)
        show = false;
}



export let show = false;
</script>

{#if show}
<div class="sidebar-container">
<div class="lote-container">

</div>
</div>
{/if}

<style>
.sidebar-container{
    position:relative;
    display:flex;
    flex-direction:row;
    width: 100%;
    height: 100%;

}

</style>