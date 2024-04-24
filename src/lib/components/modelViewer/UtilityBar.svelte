<script>
	import { CameraController, SelectionExtension, FilteringExtension } from '@speckle/viewer';
	import ToolBarButton from './ToolBarButton.svelte';
	import { get } from 'svelte/store';
	import { sphereByIDList } from '/src/lib/animation/SphereByIDList.js';
	import {
		activeIoTIndicators,
		speckleViewer,
		finishLoading,
		viewerLotes,
		speckleParqueLotes,
		colorValueDisponibility,
		sidebar_show,
		servicesSelected,
		currentSelection,
		chatMessages,
		viewerIoTElements,
		currentFilteringExtension,
		currentCameraExtension,
		speckleViewerObjects,
		viewerPMasGroupedPassports
	} from '/src/stores/toolStore.js';
	import {
		selectElementsByPropNameValue,
		groupBuilderPassports,
		resetViewerFilters,
		colorByGroupedPassport, 
		colorRoomByValueRange
	} from '/src/lib/speckle/speckleHandler.js';

	let setTopView = '/icons/top.svg';
	let colorBySector = '/icons/brand-google-maps.svg';
	let homeView = '/icons/home-2.svg';
	let services = '/icons/bolt.svg';
	let chatIcon = '/icons/robot.svg';

	let colorByProperty = '/icons/traffic-lights.svg';
	let filterOff = '/icons/filter-off.svg';

	let tempObjectIds = ['ee07ac99d4cfd23c59ef94bda65bdbe0', 'ccb4b5e5bf2ae2bfb1524e62462155d2'];

	const labelingExtension = get(speckleViewer).speckleViewer.extensions.Labelling;
	//this function will create the spheres to be assign and hide the elements
	function setTop() {
		const activeV = get(speckleViewer).speckleViewer;
		const cameraX = get(currentCameraExtension);
		console.log('activeV', cameraX);
		console.log(activeV, get(finishLoading), 'cosonle log ');
		if (cameraX && get(finishLoading)) {
			cameraX.setView('top', true);
			cameraX.zoom([], 0.75);
		}
	}
	function setHome() {
		const activeV = get(speckleViewer).speckleViewer;
		console.log("activeV",activeV);
		const cameraX = get(currentCameraExtension);
		//console.log(activeV, get(finishLoading), 'cosonle log ');
		if (cameraX && get(finishLoading)) {
			cameraX.setView('3D', true);
			cameraX.zoom([], 0.5);
		}
	}
	//generate a function that returns a random color in hex

	//create a function that isole and filter ofjects based on propertyes
	function colorByPassport() {
		const activeV = get(speckleViewer).speckleViewer;
		const currentSensors = get(viewerIoTElements);
		console.log('currentSensors', currentSensors);

		const { roomNodes, sensorNodes } = currentSensors.reduce(
			(acc, group) => {
				console.log('group', group);
				if (group.category === 'Room' || group.category === 'Habitaciones') {
					acc.roomNodes.push(group.id);
				} else {
					acc.sensorNodes.push(group.id);
				}
				return acc;
			},
			{ roomNodes: [], sensorNodes: [] }
		);

		console.log('flatList', sensorNodes);

		// Filtering
		const filteringExtension = get(currentFilteringExtension)
		filteringExtension.isolateObjects(sensorNodes, true, true);
		colorRoomByValueRange(roomNodes, [10,30,40])
		//labelingExtension.colorRoom(roomNodes[0]);
		//console.log('threeRoom', threeRoom);
		//temp comment to test roomg eometry
		currentSensors.forEach((s) => {
			if (s.category !== 'Room' && s.category !== 'Habitaciones') {
				labelingExtension.labelSensorData(s);
			}
		});
	}
	function removeFilterViewer() {
		resetViewerFilters();
		labelingExtension.removeAllLabels();
	}

	//create a function to color elements based on the Sector property
	function colorByPropertySector() {
		const activeV = get(speckleViewer).speckleViewer;
		const specklePropName = 'Sector';
		const sector1 = [];
		const sector2 = [];
		const sector3 = [];
		const sector4 = [];
		const sector5 = [];
		if (activeV && get(finishLoading)) {
			const lotes = get(viewerLotes);
			//get groups of elements ids based on the state property
			//console.log("lotes",lotes);
			lotes.forEach((lote) => {
				//console.log("lote",lote.Sector == 2);
				if (lote.Sector == 1) {
					sector1.push(lote.id);
				} else if (lote.Sector == 2) {
					sector2.push(lote.id);
				} else if (lote.Sector == 3) {
					sector3.push(lote.id);
				} else if (lote.Sector == 4) {
					sector4.push(lote.id);
				} else if (lote.Sector == 5) {
					sector5.push(lote.id);
				}
			});
			const sector1QueryObject = {
				objectIds: sector1,
				color: 0x7baffe
			};
			const sector2QueryObject = {
				objectIds: sector2,
				color: 0x936fd9
			};
			const sector3QueryObject = {
				objectIds: sector3,
				color: 0xfed633
			};
			const sector4QueryObject = {
				objectIds: sector4,
				color: 0x36d392
			};
			const sector5QueryObject = {
				objectIds: sector5,
				color: 0x359ecd
			};
			//console.log("states of color disponible and ocupado",disponibles, ocupados);
			activeV.setUserObjectColors([
				sector1QueryObject,
				sector2QueryObject,
				sector3QueryObject,
				sector4QueryObject,
				sector5QueryObject
			]);
			//activeV.setUserObjectColors([dispQueryObject])

			//need to get all the speckle elements that have the property of passport and filter them
			//const Selements = selectElementsByPropNameValue(specklePropName,passport.passportID)
			//console.log("activeV",Selements);
		}
	}
	//filter by service, the funtion will trigger the side pannel displaying the multiselect. we will pass a initial serivce like "agua"
	function filterByService(service) {
		const _sidebar_show = get(sidebar_show);
		if (_sidebar_show) {
			console.log('filter by service', service);

			sidebar_show.set(false);
			servicesSelected.set([]);
			currentSelection.set([]);
		} else {
			sidebar_show.set(true);
			servicesSelected.set([]);
		}
	}

	function resetSidebar() {
		if ($sidebar_show) {
			sidebar_show.set(false);
			servicesSelected.set([]);
			currentSelection.set([]);
		} else {
			sidebar_show.set(true);
			servicesSelected.set([]);
			currentSelection.set([]);
		}
	}
</script>

<div class="utility-bar">
	<ToolBarButton icon={setTopView} toExecute={setTop} active={false} commandName="Set Top View" />
	<ToolBarButton icon={homeView} toExecute={setHome} active={false} commandName="Set Home View" />
	<ToolBarButton
		icon={colorByProperty}
		toExecute={colorByPassport}
		active={false}
		commandName="Mostrar Sensores"
	/>
	<ToolBarButton
		icon={filterOff}
		toExecute={removeFilterViewer}
		active={false}
		commandName="Filter Reset"
	/>
</div>

<style>
	.utility-bar {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		z-index: 3;
		border-radius: 5px;
		/* From https://css.glass */
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
		width: 3em;
		height: 100%;
		top: 3rem;
		gap: 5px;
	}
</style>
