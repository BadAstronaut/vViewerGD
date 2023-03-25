import { error } from '@sveltejs/kit';
import {speckleStream, daluxSafetyDataActiveProject} from "../../../stores/toolStore";
 
/** @type {import('./$types').PageLoad} */
//vivienda interface 
const viviendaInterface = {
  title: "",
  content: "",
  speckleStream: "",
  daluxSafetyData: "",
}
async function fetchData () {
  const r =await fetch(`/api/dalux/safetyDataForms/?buildingName=Eterna`)
 .then(response => response.json())

 return r
}


export async function load({fetch, params }) {
  if (params.slug === 'vivienda-1') {
    //copy the vivienda object and set the values
    let vivienda = {...viviendaInterface};
    vivienda.title = 'Vivienda 1';
    vivienda.content = 'Vivienda 1 Welcome to our blog. Lorem ipsum dolor sit amet...';
    vivienda.speckleStream = 'df75193f4d';
    speckleStream.set(vivienda.speckleStream)
    //implement a fetach call to the dalux api to get the safety data for this building
    const buildingName = 'Eterna';

    //this part is not working, cet fetch data from the SSR, getting status 308 redirect ?
    //const daluxRes =await fetch(`/api/dalux/safetyDataForms/?buildingName=Eterna`).then(response => response.json());
    //console.log(daluxRes, 'daluxRes')
    //const daluxData = await daluxRes.json();
    //vivienda.daluxSafetyData = daluxData;
    // const vivienda = {
    //   title: 'Vivienda 1',
    //   content: 'Vivienda 2 Welcome to our blog. Lorem ipsum dolor sit amet...',
    //   speckleStream: 'df75193f4d',
    // };
    
    console.log(vivienda, 'vivienda from page')
    return vivienda
  }
  if (params.slug === 'vivienda-2') {
    const vivienda = {
      title: 'Vivienda 2',
      content: 'Vivienda 2 Welcome to our blog. Lorem ipsum dolor sit amet...',
      speckleStream: 'c5c0d684ea',
      daluxSafety
    };
    speckleStream.set(vivienda.speckleStream)
    return vivienda
  }
 
  throw error(404, 'Not found /:');
}



