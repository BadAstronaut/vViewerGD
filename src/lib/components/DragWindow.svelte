<script>
	import { draggable } from '@neodrag/svelte';
	import { gsap } from 'gsap';
	import { draggables, speckleViewer, finishLoading } from '/src/stores/toolStore';
	import { get } from 'svelte/store';
	import * as THREE from 'three';

	export let dragId;
	export let title;

	//coordinates for point
	let point1 = [0, 0, 0];
	let point2 = [0, 0, 50.6];

	let closeIcon = '/icons/x.svg';
	let parentLoaded = false;
	let boundElement = null;
	let drawLine = null;
	let v = null;

	finishLoading.subscribe((v) => {
		if (v) {
			parentLoaded = true;
			let viewer = get(speckleViewer).speckleViewer;
			v = viewer;
			boundElement = viewer.container;
			console.log(viewer, 'bound');
			createLine(point1, point2, viewer);
			console.log(drawLine, 'drawline');
			gsap.to(drawLine.scale, {
				x: 3,
				duration: 1,
				repeat: '-1',
				yoyo: true,
				onUpdate: () => {
					viewer.requestRender();
				}
			});
		} else {
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
	// we will add the code to create a line between 3D elements and floating window

	//creating points and lines
	function createLine(point1, point2, viewer) {
		let scene = viewer.filteringManager.Renderer.scene;
		let camera = viewer.filteringManager.Renderer.camera;
		let renderer = viewer.filteringManager.Renderer.renderer;

		var screenPos = new THREE.Vector3(screenX, screenY, 0);
		var worldPos = screenPos.unproject(camera);

		var lpositions = new Float32Array([screenPos.x, screenPos.y, screenPos.z, 4, 0, 0, 5]);

		// Create the buffer geometry
		var lgeometry = new THREE.BufferGeometry();
		lgeometry.setAttribute('position', new THREE.BufferAttribute(lpositions, 3));

		// Create the material
		var lmaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

		// Create the line
		var line = new THREE.Line(lgeometry, lmaterial);
		line.layers.set(2);
		drawLine = line;

		// Add the line to the scene
		scene.add(line);

		console.log(line, 'line');

		// Update camera parameters
		// Add the sphere to the scene

		console.log(gsap, 'line');
		//viewer.requestRender();
	}
	//adding them to the scene

	//getting drag window coordinates
	function getDragWindowCoordinates(e) {
		let camera = get(speckleViewer).speckleViewer.filteringManager.Renderer.camera;
		var screenPos = new THREE.Vector3(e.offsetX, e.offsetY, 0);
		var worldPos = screenPos.unproject(camera);
		//min value offset is 101 with the current window offset in x and y axis
		//max value offset is x 345 and y 169
		let newArray = new Float32Array([worldPos.x, worldPos.y, worldPos.z, 0, 0, 0]);
		gsap.to(drawLine.geometry.attributes.position, {
			array: newArray,
			duration: 0.02,
			repeat: '0'
		});

		console.log(e, screenX, 'dragging');
	}

	//you will need a store for this windows. and
	//some code like this https://svelte.dev/repl/28996f04783542ceafed7cc6a85128b9?version=3.23.0
</script>

{#if parentLoaded}
	<div class="drag-div" use:draggable={{ bounds: 'parent', onDragStart: getDragWindowCoordinates }}>
		<div class="dragg-area">
			<p class="title">{title}</p>
			<button class="close" on:click={closeWin}>
				<img src={closeIcon} alt="" class="close-button" />
			</button>
		</div>

		<slot />
	</div>
{/if}

<style>
	.title {
		margin-left: 0.6vw;
		margin-top: 0.1vw;
		font-size: 0.55em;
	}
	.close-button {
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
	.dragg-area {
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
