import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  Scene,
  Vector2
} from 'three';
import React from 'react';
import Graph from './Graph';
import { NUM_VERTEX, } from './ConnectedGraphConstants';

export default class ConnectedGraph {
  constructor() {
    this.scene = new Scene();
    this.graph = new Graph(NUM_VERTEX);
    this.clickIntercept = new Mesh(new PlaneGeometry(10, 10), new MeshBasicMaterial());
    this.clickIntercept.visible = false;
    this.graph.getMeshList().forEach(mesh => this.scene.add(mesh));
    this.scene.add(this.clickIntercept);
    this.raycaster = new Raycaster();
    this.lastRenderTime = performance.now();
    this.totalTime = 0;
  }

  update(elapsedTime) {
    this.totalTime += elapsedTime;
    this.graph.update(elapsedTime, this.totalTime);
  }

  render(renderer, camera, now) {
    const elapsedTime = Math.min(now - this.lastRenderTime, 100);
    this.lastRenderTime = now;
    this.update(elapsedTime);
    renderer.render(this.scene, camera);
  }

  start() {
    this.lastRenderTime = performance.now();
    this.totalTime = 0;
  }

  getAboutAnimationText() {
    return(
      <p>
        Animation fun with a graph.
        <br />
        <a href="https://github.com/0la0/0la0.github.io/tree/develop/src/components/home/modules/connectedGraph">
          View Source
        </a>
      </p>
    );
  }

  onClick(event, camera) {
    const clickPosition = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );
    this.raycaster.setFromCamera(clickPosition, camera);
    const clickIntersections = this.raycaster.intersectObjects([ this.clickIntercept, ]);
    if (!clickIntersections) {
      return;
    }
    const clickPoint = clickIntersections[0].point;
    this.graph.handleClick(clickPoint);
  }
}
