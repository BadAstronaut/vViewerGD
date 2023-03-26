import { writable } from 'svelte/store';
//import readable from svelte 
import { readable } from 'svelte/store';


export const  baseIoTUnits =readable( {
  temperature: '°C',
  humidity: '%',
})

export const rangosConfortTermico = readable({
  //tem values to fit data since we got too much hh no confort otherwise
         zonaA: {
            min: 12,
            max: 30,
          },
          zonaB: {
            min: 16,
            max: 26,
          },
        });

export const prototypeModel = writable({
    sensorId: "NLW01",
    sensorKPIs: {
      maxTemp: " °C",
      minTemp: " °C",
      maxHum: " %",
      minHum: " %",
    },
    chartData: {
      temperature: {
        labels: [],
        values: [],
      },
      humidity: {
        labels: [],
        values: [],
      },
    },
  });