import { ObjectSpaceNormalMap } from "three";

export function ProcessSafetyData(rawData, buildingName) {
    //console.log(rawData, 'rawData from dalux');
    const outObject = {
        safetyData: {},
        cumplimiento: 0, //number
        noCumplimiento: 0, //number
        total: 0, //counter total
        totalFormularios:0, //total formularios
        inspeccionesAbiertas:0, //total con status open
        summaryTableObjects: {}, //object with summary table data
    }
    
    //we will iterate over the items and filter out the ones with type = 'safety'
    //console.log(rawData, 'rawData from dalux');
    outObject.safetyData = cleanData(rawData, buildingName);
    const stats= getStats(outObject.safetyData);
    outObject.total = stats.total;
    outObject.cumplimiento = stats.cumplimiento;
    outObject.noCumplimiento = stats.noCumplida;
    outObject.totalFormularios = stats.totalFormularios;
    outObject.inspeccionesAbiertas = stats.inspeccionesAbiertas;
    outObject.summaryTableObjects = stats.summaryTableObjects;
    //outObject.safetyData = safetyData;
    return outObject;
}

// we will get template, status location and user defined parameters from raw data
function cleanData(rawData, buildingName) {
    //filter only safety data 
    const items = rawData.items;
    const _safetyData = items.filter(item => item.type === 'safety' && item.location.building.name === buildingName);
    const cleanObject = {
        template: "", //string
        status: "", //string
        location: "", //string
        items: [], //array
    }
    
    let cleanDataOut = [];
    //iterate over _safetyData list of Objects 
    //console.log(_safetyData, '_safetyData');
    _safetyData.forEach(item => {
        //create a copy of cleanObject
        let _cleanObject = {...cleanObject};

        //get template
        _cleanObject.template = item.template.name;
        //get status
        _cleanObject.status = item.status;
        //get location
        _cleanObject.location = item.location.building;
        //get items 
        _cleanObject.items = item.userDefinedFields.items;

        cleanDataOut.push(_cleanObject);
    })

    return cleanDataOut;
}

//here we will get the key data like cumplimiento, no cumpliento total .. 
function getStats(cleanData) {
    let outData ={
        totalFormularios:0,
        inspeccionesAbiertas:0,
        total: 0,
        cumplimiento: 0,
        noCumplida: 0,
        summaryTableObjects: [], //building, status, items with name color
    }
    let uniqueCs = extractUniqueCheckPoints(cleanData);
    //iterate over cleanData
    cleanData.forEach(item => {
        let summaryTableObject = {
            building: item.location.name,
            status: item.status,
            items: [],//name color pairs arrays 

        }

        outData.totalFormularios += 1;
        if(item.status === 'open') {
            outData.inspeccionesAbiertas += 1;
        }
        //total is how many items we have
        //cumplimiento are all the items with text valu Green from the safety items
        const itemsCumplimiento = item.items.forEach(inspection => {
            outData.total += 1;
            const vals = inspection.values;
            const _item = vals.find(v => v.text === 'Green');
            if(_item) {
                outData.cumplimiento += 1;
            }
            //summaryTableObject.items.push([inspection.name, inspection.values[0].text])
        })
        summaryTableObject.items= mapUniqueColumns(item.items, uniqueCs);
        outData.summaryTableObjects.push(summaryTableObject);
        
    })
    outData.noCumplida = outData.total - outData.cumplimiento;
    return outData;
}

// we will need a funtion to extract all unique columns in list and create items with empty color and full color depending on
//if the order has the parameter or not. 
function extractUniqueCheckPoints (cleanData){
    let uniqueColumnNames = [];
    let outObjectCollection = [];
    cleanData.forEach(item => {
        item.items.forEach(inspection => {
            const name = inspection.name;
            if(!uniqueColumnNames.includes(name)) {
                uniqueColumnNames.push(name);
                outObjectCollection.push([name, 'Transparent']);
            }

        })
    })

    return outObjectCollection;
}

function mapUniqueColumns(items, uniqueObjectCollection) {
    //iterate over items
    let updatedCollection = [];
    //override the values in updatedCollection with items values
    uniqueObjectCollection.forEach(item => {
        const name = item[0];
        const color = item[1];
        const _item = items.find(i => i.name === name);
        if(_item) {
            updatedCollection.push([name, _item.values[0].text]);
        } else {
            updatedCollection.push([name, color]);
        }
    })

    //sort outObjectCollection arrayof arrays by value at index 0 which is a string
    // updatedCollection.sort((a, b) => {
    //     if(a[0][0] < b[0][0]) {
    //         return -1;
    //     }
    //     if(a[0][0] > b[0][0]) {
    //         return 1;
    //     }
    //     return 0;
    // })
    
    return updatedCollection;
}