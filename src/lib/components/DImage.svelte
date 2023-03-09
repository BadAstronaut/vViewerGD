<script>
	import './../../css/styles.css'
	import { onMount } from 'svelte';
	import 'aframe';

	let panorama;
	let scene;
	let container;
	let currentImage;
	let nextIcon = '/icons/chevron-right.svg';
	let prevIcon = '/icons/chevron-left.svg';

	//test object for future usecas, pass a list of images with dates, change from one image
	//to the next each representing process too that point.
	let threeDImages = [
		{
			src: '/construction/DddImage.jpeg',
			date: '2021-01-01',
			location: 'location 1'
		},
		{
			src: '/construction/DddImage2.jpg',
			date: '2021-02-01',
			location: 'location 1'
		},
		{
			src: '/construction/DddImage.jpeg',
			date: '2021-03-01',
			location: 'location 1'
		}
	];

	onMount(() => {
		const el = document.querySelector('#aframe-container');
		scene = document.createElement('a-scene');
		const initialImage = threeDImages[0];

		scene.addEventListener('loaded', () => {
			scene.setAttribute('embedded', 'true');
			scene.setAttribute('vr-mode-ui', 'enabled: false');
			const sky = document.createElement('a-sky');
			// set the source attribute of a-sky to the image URL
			sky.setAttribute('src', initialImage.src, 'rotation', '0 -130 0');
			// append the a-sky element to the a-scene element
			scene.appendChild(sky);
		});
		el.appendChild(scene);
		currentImage = initialImage;
	});

	//function to change image
	function changeImage(direction) {
		const sky = document.querySelector('a-sky');
		const currentIndex = threeDImages.indexOf(currentImage);
		let nextIndex;
		if (direction === 'next') {
			nextIndex = currentIndex + 1;
		} else {
			nextIndex = currentIndex - 1;
		}
		if (nextIndex < 0 || nextIndex >= threeDImages.length) {
			return;
		}
		const nextImage = threeDImages[nextIndex];
		sky.setAttribute('src', nextImage.src);
		currentImage = nextImage;
	}
</script>

<div class="neomorfic-div threeD-container">
	<div class="threeD-image-nav">
		<button class="secondary outline threeD-nav-button" on:click={() => changeImage('prev')}>
			<img class="threeD-icon" src={prevIcon} alt="->" />
		</button>
		{#if currentImage}
			<p>{currentImage.date}</p>
		{:else}
			<p>--</p>
		{/if}
		<button class="secondary outline threeD-nav-button" on:click={() => changeImage('next')}>
			<img class="threeD-icon" src={nextIcon} alt="<-" />
		</button>
	</div>
	<div class="aframe-container" id="aframe-container" bind:this={scene} />
</div>

<style>
	.threeD-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
	}
	.threeD-container:not(.neomorfic-div):hover{
		background-color: transparent;
	}
	.aframe-container {
		width: 100%;
		height: 100%;
		margin-top: 10px;
		padding: 5px;
		border-radius: 5px;
	}
	p {
		margin: 0%;
		height: 10px;
		font-size: x-small;
	}
	.threeD-image-nav {
		display: flex;
		width: 100%;
		height: 15px;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
	}
	.threeD-nav-button {
		height: 15px;
		width: 17px;
		padding: 0%;
		margin: 5px;
		font-size: 2px;
	}
	.threeD-nav-button:hover {
		background-color: lightcyan;
	}
	.threeD-icon {
		width: 10px;
		height: 10px;
		margin: 0%;
		padding: 0%;
	}
</style>
