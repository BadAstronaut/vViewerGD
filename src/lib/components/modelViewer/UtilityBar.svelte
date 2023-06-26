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
		colorValueDisponibility
	} from '/src/stores/toolStore.js';
	import {
		selectElementsByPropNameValue,
		resetViewerFilters
	} from '/src/lib/speckle/speckleHandler.js';

	let setTopView = '/icons/top.svg';
	let colorBySector = '/icons/brand-google-maps.svg';
	let homeView = '/icons/home-2.svg';

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

	//create a function that isole and filter ofjects based on propertyes
	function colorByPropertyAvailability() {
		const activeV = get(speckleViewer).speckleViewer;
		const specklePropName = 'passportID';
		const disponibles = [];
		const ocupados = [];
		const reservados = [];
		if (activeV && get(finishLoading)) {
			const lotes = get(viewerLotes);
			//get groups of elements ids based on the state property
			lotes.forEach((lote) => {
				if (lote.Estado == 'Disponible') {
					disponibles.push(lote.id);
				} else if (lote.Estado == 'Ocupado') {
					ocupados.push(lote.id);
				} else if (lote.Estado == 'Reservado') {
					reservados.push(lote.id);
				}
			});
			const colors = get(colorValueDisponibility);
			const dispQueryObject = {
				objectIds: disponibles,
				color: colors.Disponible
			};
			const ocupQueryObject = {
				objectIds: ocupados,
				color: colors.Ocupado
			};
			const resQueryObject = {
				objectIds: reservados,
				color: colors.Reservado
			};
			console.log('states of color disponible and ocupado', disponibles, ocupados);
			activeV.setUserObjectColors([ocupQueryObject, dispQueryObject]);
			//activeV.setUserObjectColors([dispQueryObject])

			//need to get all the speckle elements that have the property of passport and filter them
			//const Selements = selectElementsByPropNameValue(specklePropName,passport.passportID)
			//console.log("activeV",Selements);
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
</script>

<div class="utility-bar">
	<ToolBarButton icon={setTopView} toExecute={setTop} active={false} commandName="Set Top View" />
	<ToolBarButton icon={homeView} toExecute={setHome} active={false} commandName="Set Home View" />
	<ToolBarButton
		icon={colorByProperty}
		toExecute={colorByPropertyAvailability}
		active={false}
		commandName="Color por Ocupado, Disponible Reservado"
	/>
	<ToolBarButton
		icon={colorBySector}
		toExecute={colorByPropertySector}
		active={false}
		commandName="Color por Sectores"
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
