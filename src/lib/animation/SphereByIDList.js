import { ObjLoader } from "@speckle/viewer";
import * as THREE from 'three';
import { gsap } from 'gsap';
import { selectElementsById, changeElementColorByIds } from "/src/lib/speckle/speckleHandler.js";

let basePoint = [{
    id: "ee07ac99d4cfd23c59ef94bda65bdbe0",
    x: 10278.353250990825,
    y: 13066.091647999327,
    z: 600.0000000000003
},
{
    id: "ccb4b5e5bf2ae2bfb1524e62462155d2",
    x: 1863.178250990813,
    y: 13066.091647999305,
    z: -399.9999999999998
}]

//here we create a function that uses gsap and receives the id of the element ids to be animated
export function sphereByIDList(viewer, sensorNodes) {
    //use this https://codesandbox.io/p/sandbox/dawn-bird-ft36lr?file=%2Fsrc%2FLabelling.ts
    let threeSpheres = [];
    console.log('viewer loadding......', sensorNodes)
    let scene = viewer.speckleRenderer.scene;
    let duration = 5;
    let delay = 0.5;
    //get coordinates from base point 
    let coordinates = [{ x: -130, y: 3, z: 4 }];
    // ids.forEach(id => {  
    //     let idCoord = getElementCoordinatesByID(id)
    //     console.log(idCoord, 'x,y,z..........')
    //     let {x,y,z} = idCoord.basePoint
    //     coordinates.push({x,y,z})
    // })
    // //convert units to meters
    // let coordinatesTom = coordinates.map(coordinate => convertUnitsTom(coordinate))
    // //console.log(coordinatesTom, 'coordinatesTom..........')
    // //create sphere for each coordinate, add animation and add to scene
    //changeElementColorByIds(ids, 0xc1e0db)
    let spheres = coordinates.map(coordinate => {
        const sphere = ThreeSphere(coordinate);
        scene.add(sphere)
        gsap.to(sphere.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
            duration: 1.5,
            repeat: '-1',
            yoyo: true,
            onUpdate: () => {
                viewer.requestRender();
            }
        });
        threeSpheres.push(sphere)
    })
    //we return the timeline
    return threeSpheres;
}

function ThreeSphere(position) {
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.25),
        new THREE.MeshBasicMaterial({
            color: 0xc1e0db,
            opacity: 0.7,
            transparent: true
        })
    );
    sphere.position.set(position.x, position.y, position.z);
    sphere.layers.set(2);
    return sphere;
}

function getElementCoordinatesByID(id) {
    const element = selectElementsById(id);
    return element
}

function convertUnitsTom(coordinates) {
    return {
        x: coordinates.x / 1000,
        y: coordinates.y / 1000,
        z: coordinates.z / 1000
    }
}

//here we will need a funtion that isolate all elements in view except sensors
