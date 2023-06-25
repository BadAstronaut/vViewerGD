import { readable, writable } from 'svelte/store';


export const speckleViewer = writable({
    speckleViewer: null

})

export const activeIoTIndicators = writable([])

export const finishLoading = writable(false);

export const speckleStream = writable('xxxx')

export const speckleDatatree = writable(null);

export const draggables = writable([
    { id:'Sensor', name: 'Temperatura', active:false},
    { id:'SensorHum', name: 'Humedad', active:false},
    { id:'PDF', name: 'PDF', active:false },
    // other items can go here
    //walmart items
    { id:'WmtSensors', name: 'Panel Digital Twin Walmart', active:false },
    { id:'SensorDetailPanel', name: 'Sensor Detail Panel', active:true },
])

export const currentSelection = writable(null)

export const daluxSafetyDataActiveProject = writable(null)

export const selectionPropertiesOfInterest = readable([
    { 
        name: 'family', 
        value:true
    },
    { 
        name: 'units', 
        value:true
    },
])

export const passportProps = writable({
    passportID: "999-999",
    greenRate: 0.5,
    greenStatus: "Bueno",
})

export const lotesProps = writable(["type", "Area", "Estado","Servicios","Sector"]) 
export const protosProps = writable(["LoteID", "Nombre", "Empresas","Fecha Ingreso", "Fecha Egreso", "Contacto", "Planos de Proyecto"])   


export const speckleParqueLotes = writable([])

export const speckleParqueProtos = writable([])

export const viewerLotes = writable([])

export const viewerProtos = writable([])

export const currentLote = writable(null)

export const currentProto = writable(null)

export const sidebar_show = writable(false)

export const colorValueDisponibility = writable({
    Disponible: 0x6fc066,
    Ocupado: 0xc0666f,
    Reservado: 0x666fc0,
})
