import {
  Extension,
  InputEvent,
  ObjectLayers,
} from "@speckle/viewer";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Vector2, Box3, Vector3 } from "three";

export class Labelling extends Extension {
  labelRenderer;

  constructor(viewer) {
    super(viewer);
    this.viewer
      .getRenderer()
      //.input.on(InputEvent.Click, this.onClick.bind(this));

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(this.labelRenderer.domElement);
  }

  onClick(e) {
    const result = this.viewer
      .getRenderer()
      .intersections.intersect(
        this.viewer.getRenderer().scene,
        this.viewer.getRenderer().renderingCamera,
        e,
        true,
        this.viewer.getRenderer().clippingVolume,
        [
          ObjectLayers.STREAM_CONTENT_MESH,
          ObjectLayers.STREAM_CONTENT_POINT,
          ObjectLayers.STREAM_CONTENT_LINE,
          ObjectLayers.STREAM_CONTENT_TEXT,
        ]
      );

    if (result) {
      const rv = this.viewer
        .getRenderer()
        .renderViewFromIntersection(result[0]);
      this.addLabel(`Primitives: ${rv.batchCount}`, result[0].point);
    }
  }

  addLabel(text, location) {
    const earthDiv = document.createElement("div");
    earthDiv.className = "label";
    earthDiv.textContent = text;
    earthDiv.innerHTML = text.replace(/\n/g, '<br>');  // Convert newlines to HTML breaks
    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.copy(location);
    earthLabel.layers.set(ObjectLayers.OVERLAY);
    this.viewer.getRenderer().scene.add(earthLabel);
  }

  colorRoom(roomId) {
    const color = new Vector3(0, 0, 0);
    const box = new Box3();
    const rvs = this.viewer
    .getWorldTree()
    .getRenderTree()
    .getRenderViewsForNodeId(roomId);
  rvs.forEach((rv) => {
    console.log("three js elemento from room", rv);
    box.union(rv.aabb);
  });


  }
  labelSensorData(sensor) {
    const box = new Box3();
    let primitiveCount = 0;
    const rvs = this.viewer
      .getWorldTree()
      .getRenderTree()
      .getRenderViewsForNodeId(sensor.id);
    rvs.forEach((rv) => {
      console.log("three js elemento from getRenderViewsForNodeId", rv, sensor);
      box.union(rv.aabb);
    });
    if (rvs.length > 0) {
      let labelText = '';
      let imageIncluded = false;
      // Dynamically create label text from sensor properties
      Object.keys(sensor).forEach(key => {
        if (key !== 'id') {  // Exclude the 'id' property
          const value = sensor[key] || `No ${key}`;  // Provide a default if the property is undefined
          labelText += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;  // Format key as label

          if (key === 'sensorModel') {
            // Assume sensorModel is the filename of the image in static/sensors
            labelText += `<div style="display: flex; justify-content: center; width: 100%;"><img src="/sensors/${value}.png" alt="Default Sensor Image" style= width: 200px; height: auto; max-height: auto;"></div>\n`;
            imageIncluded = true;
          }
        }
      });
      // Check if no image was included and add a default one
      if (!imageIncluded) {
        labelText += '<div style="background-color: white; padding: 10px; border-radius: 5px;"><img src="/sensors/default.png" alt="Default Sensor Image" style="max-width: 200px; width: 200px; height: auto; max-height: auto;"></div>\n';
      }

      labelText += '</div>';
      // Check if labelText is empty (in case the sensor object is missing or only has an id)
      if (!labelText) {
        labelText = 'No sensor data available';
      }

      this.addLabel(labelText, box.getCenter(new Vector3()));
    } else {
      // Handle cases where there are no render views
      this.addLabel('No data available', new Vector3());
    }
  }

  removeAllLabels() {
    const scene = this.viewer.getRenderer().scene;
    // Create an array to hold labels that need to be removed
    const toRemove = [];

    // Traverse all objects in the scene
    scene.traverse((object) => {
      if (object instanceof CSS2DObject) {
        toRemove.push(object);
      }
    });

    // Remove each label from the scene
    toRemove.forEach((label) => {
      scene.remove(label);
    });

    // Optionally, dispose of the objects if necessary to free up resources
    toRemove.forEach((label) => {
      if (label.element) {
        label.element.remove(); // Remove the HTML element from the DOM
      }
      //label.dispose(); // Dispose of the label object
    });
  }

  onRender() {
    this.labelRenderer.render(
      this.viewer.getRenderer().scene,
      this.viewer.getRenderer().renderingCamera
    );
  }

  onResize() {
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }
}
