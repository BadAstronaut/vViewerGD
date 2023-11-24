import { ViewerEvent } from "@speckle/viewer";
import { getStreamCommits, getUserData } from "./speckleUtils.js";
import { get } from "svelte/store";
import { speckleViewer, finishLoading, speckleStream, speckleDatatree, revitProps, protosProps, speckleParqueLotes, speckleParqueProtos, viewerLotes, viewerProtos, revitPassportParameterName, viewerIoTElements,viewerPMasGroupedPassports } from "../../stores/toolStore";
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
    const _ioTObjects = getViewerObjects(iotSensors)
    console.log("ioT Objects....",_ioTObjects)
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

    speckleObjects.forEach(obj => {
        //clone viewerObj
        const props = obj.parameters
        const _viewerObj = {}
        _viewerObj.id = obj.id
        _viewerObj.category = obj.category
        _viewerObj.tipo = type
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