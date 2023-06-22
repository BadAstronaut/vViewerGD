import { ViewerEvent } from "@speckle/viewer";
import { getStreamCommits, getUserData } from "./speckleUtils.js";
import { get } from "svelte/store";
import { speckleViewer, finishLoading, speckleStream, speckleDatatree, lotesProps, protosProps, speckleParqueLotes, speckleParqueProtos, viewerLotes, viewerProtos } from "../../stores/toolStore";
import {
    getPropertiesByTypeParameter,
    filterByCategoryNames
  } from "$lib/speckle/speckleHandler";



export async function buildViewerData() {
    const speckleDT = get(speckleDatatree)
    setSpeckleObjects(speckleDT)
    getViewerObjects()
    //console.log("lotessss",speckleDT)

}
//this function builds the speckle base objects in the scene (lotes and protos)
function setSpeckleObjects(speckleDT){
    const propsToQuery = get(lotesProps)
    const catNames = ["Emplazamiento", "Site"]
    const protoCatNames = ["Masa", "Mass"]
    const siteCats = filterByCategoryNames(speckleDT,catNames)
    const protoCats = filterByCategoryNames(speckleDT,protoCatNames)
    speckleParqueLotes.set(siteCats)
    speckleParqueProtos.set(protoCats)
}

function getViewerObjects(){
    const loteParams = get(lotesProps)
    const protoParams = get(protosProps)
    const speckleLote = get(speckleParqueLotes)
    const speckleProto = get(speckleParqueProtos)

    const loteViewerObjects = extractParamData(speckleLote, loteParams, "Lote")
    const protoViewerObjects = extractParamData(speckleProto, protoParams, "Proto")
    
    viewerLotes.set(loteViewerObjects)
    viewerProtos.set(protoViewerObjects)
    //console.log("loteViewerObjects",loteViewerObjects)
}

function extractParamData(speckleObjects, params, type){
    const paramData = []

    speckleObjects.forEach(obj => {
        //clone viewerObj
        const props = obj.parameters
        const _viewerObj = {}
        _viewerObj.id = obj.id
        _viewerObj.category = obj.category
        _viewerObj.tipo = type
        //console.log("====obj",obj.parameters["Area"])
        params.forEach(param => {
            //console.log("====prop",prop)
            if(props[param]){
                _viewerObj[param] = props[param].value
            
            }})
        if(type === "Lote"){
            //console.log("lot]]]]]]]]]]]]]e",obj)
            _viewerObj.LoteID = obj.definition.type
        }
        else if(type === "Proto"){
           
        }
        paramData.push(_viewerObj)
    })

    return paramData
}