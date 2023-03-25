import * as THREE from 'three';
import { gsap } from 'gsap';

let basePoint = {
    x: 10437.378250989903,
    y: 14259.091647999354,
    z: 156.9999999999299
}

//here we create a function that uses gsap and receives the id of the element ids to be animated
export function sphereByIDList(viewer, ids) {
    let scene = viewer.filteringManager.Renderer.scene;
    let duration = 5;
    let delay = 0.5;
    //lets add the sphere to the scene 
    let dimensiongUnits = convertUnitsTom(basePoint)
    const sphere = ThreeSphere(dimensiongUnits);
    scene.add(sphere)
    gsap.to(sphere.scale, {
				x: 0.7,
                y: 0.7,
                z: 0.7,
				duration: 1.5,
				repeat: '-1',
				yoyo: true,
				onUpdate: () => {
					viewer.requestRender();
				}
			});

    
    //we return the timeline
    return sphere;
}

function ThreeSphere (position) {
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshBasicMaterial({ 
            color: 0x3f51b5, 
            opacity: 0.5, 
            transparent: true})
    );
    sphere.position.set(position.x, position.y, position.z);
    sphere.layers.set(2);
    return sphere;
}

function getElementCoordinatesByID(id) {
    const element = document.getElementById(id);
    const { x, y } = element.getBoundingClientRect();
    return { x, y };
}

function convertUnitsTom(coordinates) {
    return {
        x: coordinates.x / 1000,
        y: coordinates.y / 1000,
        z: coordinates.z / 1000
    }
}

//here we will need a funtion that isolate all elements in view except sensors
