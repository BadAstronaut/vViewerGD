<script>
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
		viewerPMasElements
	} from '/src/stores/toolStore.js';
	import {
		selectElementsByPropNameValue,
		resetViewerFilters
	} from '/src/lib/speckle/speckleHandler.js';

	let setTopView = '/icons/top.svg';
	let colorBySector = '/icons/brand-google-maps.svg';
	let homeView = '/icons/home-2.svg';
	let services = '/icons/bolt.svg';
	let chatIcon = '/icons/robot.svg';

	let colorByProperty = '/icons/traffic-lights.svg';
	let filterOff = '/icons/filter-off.svg';

	let tempObjectIds = ['ee07ac99d4cfd23c59ef94bda65bdbe0', 'ccb4b5e5bf2ae2bfb1524e62462155d2'];

	//this function will create the spheres to be assign and hide the elements
	function setTop() {
		const activeV = get(speckleViewer);
		console.log('activeV', activeV);
		console.log(activeV, get(finishLoading), 'cosonle log ');
		if (activeV.speckleViewer && get(finishLoading)) {
			activeV.speckleViewer.setView('top', true);
			activeV.speckleViewer.zoom([], 0.75);
			//console.log(activeV, "cosonle log ");
			//console.log("showing sensor animation",get(activeIoTIndicators));
		}
	}
	function setHome() {
		const activeV = get(speckleViewer);
		//console.log("activeV",activeV);
		console.log(activeV, get(finishLoading), 'cosonle log ');
		if (activeV.speckleViewer && get(finishLoading)) {
			activeV.speckleViewer.setView('3D', true);
			activeV.speckleViewer.zoom([], 0.5);
			//console.log(activeV, "cosonle log ");
			//console.log("showing sensor animation",get(activeIoTIndicators));
		}
	}
	//generate a function that returns a random color in hex
	function getRandomColor() {
		var letters = '0123456789abcdef';
		var color = '#'; // Changed this line
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		console.log('color', color);
		return color;
	}

	//create a function that isole and filter ofjects based on propertyes
	function colorByPassport() {
		const activeV = get(speckleViewer).speckleViewer;
		let groupedByPassport = [];
		const colorPassportObject = {
			IDPasaporte: '',
			color: '',
			objectIds: []
		};
		if (activeV && get(finishLoading)) {
			const pMasElements = get(viewerPMasElements);
			//iterate over pMasElements and group them by passport
			pMasElements.forEach((element) => {
				//console.log("element",element);
				const passportID = element.IDPasaporte;
				const color = getRandomColor();
				//check if object with passportID exists in groupedByPassport
				const passportObject = groupedByPassport.find(
					(passport) => passport.IDPasaporte == passportID
				);
				if (passportObject) {
					//console.log("passportObject",passportObject);
					passportObject.objectIds.push(element.id);
				} else {
					//console.log("passportObject",passportObject);
					const newPassportObject = {
						IDPasaporte: passportID,
						color: color,
						objectIds: [element.id]
					};
					groupedByPassport.push(newPassportObject);
				}
			});
			console.log('groupedByPassport', groupedByPassport);
			//need to implement a function instead to isolated elements in viewer and filter 
			activeV.setUserObjectColors(groupedByPassport);
		}
	}
	function removeFilterViewer() {
		resetViewerFilters();
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
		commandName="Colorear Pasaportes"
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
