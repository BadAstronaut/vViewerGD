import { ViewerEvent } from "@speckle/viewer";
import { getStreamCommits, getUserData } from "./speckleUtils.js";
import { get } from "svelte/store";
import { revitProps, revitPassportParameterName, viewerIoTElements,speckleViewerObjects} from "../../stores/toolStore";
import {
    getPropertiesByTypeParameter,
    filterByCategoryNames,
    filterByCustomPropertyName,
    checkCustomPropertyByName, 
    groupBuilderPassports
} from "$lib/speckle/speckleHandler";



export async function buildViewerData(speckleDT) {
    setSpeckleObjects(speckleDT)
    //const pMasRefinedObjects = getViewerObjects()
    //console.log("redeffinedd",get(viewerPMasElements))

}
//this function builds the speckle base objects in the scene (lotes and protos)
function setSpeckleObjects(speckleDT) {
    const propsToQuery = get(revitProps)
    const iotProps = get(revitPassportParameterName)
    const iotSensors = filterByCustomPropertyName(speckleDT, iotProps)
    speckleViewerObjects.set(iotSensors)
    //console.log("iotSensors........", iotSensors)
    const _ioTObjects = getViewerObjects(iotSensors)
    viewerIoTElements.set(_ioTObjects)
    //const groupedPass = groupBuilderPassports(_ioTObjects)
    //viewerPMasGroupedPassports.set(groupedPass)
    //console.log("groupedPass from builder",groupedPass, "passport EEE")    
}

function getViewerObjects(pmasObjects) {
    const _revitProps = get(revitProps)
    //to do modify this to ad props to render in front end. 
    const pMasViewerObjects = extractParamData(pmasObjects, _revitProps, "IoT")
    return pMasViewerObjects
    //console.log("loteViewerObjects",loteViewerObjects)
}

function extractParamData(speckleObjects, params, type) {
    const paramData = []
    const iotProps = get(revitPassportParameterName)
    speckleObjects.forEach(obj => {
        //clone viewerObj
        //console.log("obj",obj)
        const props = obj.model.raw.parameters
        const _viewerObj = {}
        _viewerObj.id = obj.model.raw.id
        _viewerObj.category = obj.model.raw.category
        _viewerObj.tipo = type
        _viewerObj.sensorManufacturer = checkCustomPropertyByName(props, "Sensor Manufacturer")
        _viewerObj.sensorModel = checkCustomPropertyByName(props, "Sensor Model")
        _viewerObj.sensorMeasurement = checkCustomPropertyByName(props, "Sensor Measurement")

        //_viewerObj.sensorType = obj.type
        //console.log("====obj",obj.parameters["Area"])
        const checkCustomPMas = checkCustomPropertyByName(props, get(revitPassportParameterName))
        _viewerObj.sensorID = checkCustomPMas ? checkCustomPMas : "No ID"
        //console.log("checkCustomPMas", checkCustomPMas)
        paramData.push(_viewerObj)
    })
    //console.log("paramData", paramData)
    return paramData
}