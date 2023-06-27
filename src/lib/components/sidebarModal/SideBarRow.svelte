<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let propName = '';
	export let propValue = '';

	let _propValue = '';
	let _urlProp = false;
	let icon = "/icons/arrow-badge-right.svg"

	function truncateString(str, maxLength) {
		let truncatedString = '';
		if (str.length <= maxLength) {
			truncatedString = str;
		} else {
			//check if its string if it is get the first 15 characters
			if (typeof str === 'string') {
				truncatedString = str.substring(0, maxLength) + '...';
			} else {
				truncatedString = str;
			}
		}
		return truncatedString;
	}
	//create a function that check if the prop value contains http or https, if so return an html a element pointing to that url
	//if not return the prop value
	function checkIfUrl(propValue) {
		if (propValue.includes('http') || propValue.includes('https')) {
			_urlProp = true;
			return `<a href="${propValue}">${propValue}</a>`;
		} else {
			return propValue;
		}
	}

	onMount(() => {
		//check if propValue is string
		let _propValueType = typeof propValue === 'string' ? propValue : true;
		if (typeof propValue === 'string' || propValue instanceof String) {
			//console.log('propValue is string', propValue);
			return checkIfUrl(propValue)
		}else
        {
            _propValue = propValue;
        }
	});
</script>

<li class="row-container">
	<img src={icon} alt="-" />
	<span class="prop-style" >{propName} : </span>
	{#if _urlProp}
		<a class="prop-style" a href={propValue} target="_blank">{truncateString(propValue, 20)}</a>
	{:else}
		<p class="prop-style">{truncateString(propValue, 20)}</p>
	{/if}
</li>

<style>
	.row-container {
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: flex-start;
		width: 100%;
		height: 0.9em;
		border-radius: 5px;
		margin: 0;
		padding: 0.7em;
	}
	.prop-style{
		font-size: 0.9em;
		font-weight: 300;
		line-height: 1.2em;


	}
	span {
		font-size: 0.9em;
		font-weight: 500;
		line-height: 1.2em;
		align-self: self-start;
	}
</style>
