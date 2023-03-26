import {transformSensorByID} from './transformIotSensorById.js';

let iotAwsEndpoint = import.meta.env.VITE_IOTAWS_ENDPOINT;
//https://stackoverflow.com/questions/70472978/sveltekit-proxy-api-to-avoid-cors
//useful but still getting 404 error

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    //takes the url and search parameters like this http://localhost:5173/api/iotSensors/iotGetSensorById/?sensorId=NLW01 
    const sensorId = url.searchParams.get('sensorId');
    const response =await fetch(iotAwsEndpoint, {
        headers: {
            deviceID: sensorId
        }
    });
    const data = await response.json();
    const cleanData = transformSensorByID(data);
    //console.log(data, 'data from server dalux endpoint')
    //return response.ok;
    return new Response(JSON.stringify(cleanData))
    //return  new Response(JSON.stringify(data))
  }