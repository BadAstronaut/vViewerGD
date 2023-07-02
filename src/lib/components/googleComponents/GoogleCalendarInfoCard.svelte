<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	export let dayEvents;

	let day = dayEvents[0];
	let eventArrray = dayEvents[1];
	let buildingIcon = '/icons/building-community.svg';
	console.log('loooogiiiin calendar', eventArrray);
</script>

<span class="date">{day}:</span>
<div class="day-events">
	{#each eventArrray as event}
		<div class="calendar-card-container">
			<div class="header-container">
				<img src={buildingIcon} alt="" />
				<span class="espacio">{event.eventSpace}</span>
			</div>
			<div class="info-container">
				<div class="time-container">
					<span class="time-main">{event.start.getHours()}:</span>
					<span class="time-main">{event.start.getMinutes()}</span>
				</div>
				<span class="event-name">{event.eventName}</span>
				<div class="time-container">
					<span class="time-main">{event.end.getHours()}:</span>
					<span class="time-main">{event.end.getMinutes()}</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
    .day-events{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
        gap: 5px;
    }
	.calendar-card-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: auto;
        padding: 0;
        margin: 0;
	}
	.header-container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		height: 1.5em;
        gap: 0.5em;
		padding: 10px;
	}
	.info-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 2em;
		padding: 10px;
	}
    .date{
        font-size: 0.9em;
        font-weight: 600;
        margin: 0;
        padding: 0;
    }
	.time-container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		width: 20%;
		height: 2em;
		padding: 10px;
	}
	.espacio {
		font-size: 0.7em;
		font-weight: 300;
	}
	.time-main {
		font-size: 0.7em;
		font-weight: 300;
	}
	.event-name {
		font-size: 0.8em;
		font-weight: 400;
	}
</style>
