import { readable, writable } from 'svelte/store';


export const speckleViewer = writable({
    speckleViewer: null

})
export const currentFilteringExtension = writable(null)

export const currentCameraExtension = writable(null)

export const currentLabelingExtension = writable(null)

export const userID = writable(null)
//production socektIoUrl config 
//export const socketIoUrl = readable("https://pmasapi.pasaportemateriales.cl")
//local socketIoUrl config
export const socketIoUrl = readable("https://gemelodigitalapi.pasaportemateriales.cl")

export const socketIoUrlLocal = readable("http://localhost:3000")

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

export const revitProps = writable(["type", "category"]) 

export const protosProps = writable(["type", "category", "IDPasaporte"]) 

export const speckleParqueLotes = writable([])

export const selectedPassports = writable([])

export const revitPassportParameterName = readable(["SensorID", "Sensor Espacio"])

export const speckleParqueProtos = writable([])

export const viewerLotes = writable([])

export const viewerIoTElements = writable([])

export const speckleViewerObjects = writable([])


export const viewerPMasGroupedPassports = writable([])

export const viewerProtos = writable([])

export const currentLote = writable(null)

export const currentProto = writable(null)

export const sidebar_show = writable(false)

export const colorValueDisponibility = writable({
    Disponible: 0x6fc066,
    Ocupado: 0xc0666f,
    Reservado: 0x666fc0,
})
//create the services available array
export const servicesAvailable = readable(["Agua", "Electricidad", "Red Sanitaria"])
//this variable will hold the service selected array from the filter 
export const servicesSelected = writable(["Agua"])

export const parkOperationCalendarID = readable("c_aaf71807274436569a51ea7e5cd5ba450cf11c70c083ac632a68cc4b9ff60dfc@group.calendar.google.com")

export const googleCalendarEventsByDay = writable([])

export const chatMessages = writable([])