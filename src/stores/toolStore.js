import { Viewer } from '@speckle/viewer';
import { readable, writable } from 'svelte/store';

export const speckleViewer = writable({
    speckleViewer: null

})
export const finishLoading = writable(false);

export const speckleStream = writable('xxxx')

export const draggables = writable([
    { id:'Sensor', name: 'Temperatura', active:false},
    { id:'SensorHum', name: 'Humedad', active:false},
    { id:'PDF', name: 'PDF', active:false },
    // other items can go here
    //walmart items
    { id:'WmtSensors', name: 'Panel Digital Twin Walmart', active:false },
])

export const currentSelection = writable(null)