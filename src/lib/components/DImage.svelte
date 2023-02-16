<script>
	import { onMount } from 'svelte';
	import 'aframe';

	let panorama;
	let scene;
	let container;
	onMount(() => {
		const el = document.querySelector('#aframe-container');
		scene = document.createElement('a-scene');

		scene.addEventListener('loaded', () => {
			scene.setAttribute('embedded', 'true');
            scene.setAttribute('vr-mode-ui', 'enabled: false');
			const sky = document.createElement('a-sky');
			// set the source attribute of a-sky to the image URL
			sky.setAttribute('src', '/construction/DddImage.jpeg', 'rotation', '0 -130 0');
			// append the a-sky element to the a-scene element
			scene.appendChild(sky);
		});
		el.appendChild(scene);
	});
</script>

<div class="aframe-container" id="aframe-container" bind:this={scene} />

<style>
	.aframe-container {
		width: 100%;
		height: 100%;
		padding: 5px;
		border-radius: 5px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
</style>
