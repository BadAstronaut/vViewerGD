<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import GoogleCalendarInfoCard from './GoogleCalendarInfoCard.svelte';
	import { googleCalendarEventsByDay } from '/src/stores/toolStore.js';

	let eventArrray = [];

	onMount(async () => {
		let _eventArrray =get(googleCalendarEventsByDay);
        eventArrray =Object.entries(_eventArrray);
	});
</script>

<div class="google-info-container">
	{#if eventArrray.length>0}
		<div class="day-container">
			{#each eventArrray  as eventVals}
				<GoogleCalendarInfoCard dayEvents={eventVals}/>
			{/each}
		</div>
	{/if}
</div>

<style>
	.google-info-container {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		z-index: 3;
		border-radius: 5px;
		/* From https://css.glass */
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.1);
		-webkit-backdrop-filter: blur(3px);
		width: 20em;
		height: 50%;
		top: 3rem;
        margin-left: 3.5rem;
		gap: 5px;
        scroll-behavior: smooth;
        overflow-y: hidden;
	}
    .day-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        min-height: 20em;
        gap: 5px;
    }
</style>
