<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let propName = '';
	export let propValue = '';

	let _propValue = '';
	let _urlProp = false;

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
			return `<a href="${propValue}">${propValue}</a>`;
		} else {
			return propValue;
		}
	}

	onMount(() => {
		//check if propValue is string
		let _propValueType = typeof propValue === 'string' ? propValue : true;
		console.log(_propValueType, 'propValue');
		if (_propValueType) {
			_urlProp = checkIfUrl(propValue) ? true : false;
            console.log(_urlProp, 'propValue');
		}else
        {
            _propValue = propValue;
        }
	});
</script>

<li class="row-container">
	<span>{propName} : </span>
	{#if _urlProp}
		<a a href={propValue} target="_blank">{truncateString(propValue, 20)}</a>
	{:else}
		<p>{truncateString(propValue, 20)}</p>
	{/if}
</li>

<style>
	.row-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 1em;
		gap: 5px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding-left: 5px;
	}
    p{
        margin: 0;
    }
</style>
