import { error } from '@sveltejs/kit';
import {speckleStream} from "../../../stores/toolStore";
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.slug === 'vivienda-1') {
    
    const vivienda = {
      title: 'Vivienda 1',
      content: 'Vivienda 2 Welcome to our blog. Lorem ipsum dolor sit amet...',
      speckleStream: 'df75193f4d'
    };
    speckleStream.set(vivienda.speckleStream)
    return vivienda
  }
  if (params.slug === 'vivienda-2') {
    const vivienda = {
      title: 'Vivienda 2',
      content: 'Vivienda 2 Welcome to our blog. Lorem ipsum dolor sit amet...',
      speckleStream: 'c5c0d684ea'
    };
    speckleStream.set(vivienda.speckleStream)
    return vivienda
  }
 
  throw error(404, 'Not found /:');
}
