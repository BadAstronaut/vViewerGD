import { writable } from 'svelte/store';

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