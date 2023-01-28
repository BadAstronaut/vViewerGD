import { Viewer } from '@speckle/viewer';
import { readable, writable } from 'svelte/store';

export const speckleViewer = writable({
    speckleViewer: null

})
export const finishLoading = writable(false);

export const speckleStream = writable('xxxx')