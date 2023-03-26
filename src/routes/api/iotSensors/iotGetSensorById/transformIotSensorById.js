//import from iotStore
import {rangosConfortTermico} from '../../../../stores/iotStore.js';
//import get from svelt 
import { get } from 'svelte/store';


//this are use to process the raw data and extract the values data sets to be used in charts
const dataTypes = ['temperature', 'humidity'];

const baseSensorObject= {
        "timeStamp": 1679832960403,
		"serialNumber": "NLW01",
		"temperature": 18.17,
		"humidity": 46.67
        }
const transformSensorData = {
    rawData: [], //array of objects as they come 
    maxT: 0, //max temperature if exist
    minT: 0, //min temperature if exist
    maxH: 0, //max humidity if exist
    minH: 0, //min humidity if exist
    weeklyTChange: 0, //change in temperature from one week ago to this week
    weeklyHChange: 0, //change in humidity from one week ago to this week
    hhConfort: 0, //hours of confort
    hhNoConfort: 0, //hours of no confort

}
//function to transform aws sensor data. 
export function transformSensorByID(sensorD){
    //console.log(sensorD, 'sensorD...........');
    let _transformSensorData = {...transformSensorData};
    const tExist = checkIfExist(sensorD, 'temperature');
    const hExist = checkIfExist(sensorD, 'humidity');
    const rangosConfort = get(rangosConfortTermico);
    if(tExist){
        _transformSensorData.maxT = getMaxVal(sensorD, 'temperature');
        _transformSensorData.minT = getMinVal(sensorD, 'temperature');
        _transformSensorData.weeklyTChange = getValChange(sensorD, 'temperature', 168).toFixed(2);
        const confortRange = getConfortHours(sensorD, rangosConfort.zonaA);
        _transformSensorData.hhConfort =confortRange[0];
        _transformSensorData.hhNoConfort = confortRange[1];
    }
    if(hExist){
        _transformSensorData.maxH = getMaxVal(sensorD, 'humidity');
        _transformSensorData.minH = getMinVal(sensorD, 'humidity');
        _transformSensorData.weeklyHChange = getValChange(sensorD, 'humidity', 168).toFixed(2);
    }
    //console.log(rangosConfortTermico, 'sensorD');
    _transformSensorData.rawData =transformSensorDataForChart(sensorD, dataTypes) ;
    return _transformSensorData
}
//function to check if temp an humidity values existist in sensor data
function checkIfExist(sensorData, parameterName){
    const exist = sensorData.some(sensor => sensor[parameterName]);
    return exist;
}

// create a function to get max temperature from an array ob sensor objects
export function getMaxVal(sensorArray,PropName){
    const maxTemperature = sensorArray.reduce((max, sensor) => {
        const prompVal = sensor[PropName];
        return prompVal > max ? prompVal : max;
      }, Number.NEGATIVE_INFINITY);
    return maxTemperature;
}
//create a function to get min temperature from an array of sensor objects
export function getMinVal(sensorArray, PropName){
    const minTemperature = sensorArray.reduce((min, sensor) => {
        const prompVal = sensor[PropName];
        return prompVal < min ? prompVal : min;
      }, Number.POSITIVE_INFINITY);
    return minTemperature;
}
//create a funtion to get the change in temperature from one week ago to this week from an array of sensor objects 
export function getValChange(sensorArray,propName,PeriodIntervalInHours){
    const valueIntervals = ((sensorArray[0].timeStamp - sensorArray[1].timeStamp)/(1000*3600));
    //refactor this logic later to correctly implement time intervals, for now will be fix in a wee
    const slicingValue = Math.floor(PeriodIntervalInHours/valueIntervals);
    //console.log(valueIntervals, 'slicingValue');
    //temp value spliting list in two 
    const period =Math.floor(sensorArray.length/2) ;
    let tempChange = 0;
    let thisWeek = sensorArray.slice(0,period);
    let lastWeek = sensorArray.slice(period,period*2);
    let lastWeekMaxTemp = getMaxVal(lastWeek, propName);
    let thisWeekMaxTemp = getMaxVal(thisWeek, propName);
    tempChange = thisWeekMaxTemp - lastWeekMaxTemp;
    //console.log(tempChange, 'tempChange')
    return tempChange
}

//create a function to detect the number of hours of confort and no confort from an array of sensor objects
function getConfortHours(sensorData, confortRange){
    const timeInterval = 3600; // 1 hour in seconds
    const {comfortHours,discomfortHours }= sensorData.reduce((total, sensorReading, index, array) => {
        if (index === 0) {
          // Skip the first sensor reading as we need two readings to calculate the time difference
          return total;
        }
        const prevSensorReading = array[index - 1];
        const timeDiff = sensorReading.timestamp - prevSensorReading.timestamp;
        const avgTemperature = (sensorReading.temperature + prevSensorReading.temperature) / 2;
        if (avgTemperature >= confortRange.min && avgTemperature <= confortRange.max) {
          total.comfortHours += timeInterval;
          console.log(total, 'total');
        } else {
            total.discomfortHours += timeInterval;
        }
        console.log(total, 'total');
        return total;
      },{comfortHours: 0, discomfortHours: 0}
    );
    //console.log(comfortHours,discomfortHours, 'comfortHours,discomfortHours');
    return [(comfortHours/timeInterval),(discomfortHours/timeInterval)];

    
}

//this function will transform the raw data and extract values and labels to use in charts
function transformSensorDataForChart(sensorData,dataTypes){
    let dataSets =[]
    let chartInterface = {
        type: '',
        labels: [],
        values: [],
    }
    const labels = sensorData.map(sensor => sensor.timeStamp);
    //iterate over dataTypes array and create a dataset for each type


    dataTypes.forEach (dataType => {
        if(dataType === 'temperature'){
            const tempData = sensorData.map(sensor => sensor.temperature);
            const tempDataSet = {...chartInterface};
            tempDataSet.type = 'temperature';
            tempDataSet.labels = labels;
            tempDataSet.values = tempData;
            dataSets.push(tempDataSet);
        }
        if(dataType === 'humidity'){
            const humData = sensorData.map(sensor => sensor.humidity);
            const humDataSet = {...chartInterface};
            humDataSet.type = 'humidity';
            humDataSet.labels = labels;
            humDataSet.values = humData;
            dataSets.push(humDataSet);
        }
    })
    return dataSets; 

}