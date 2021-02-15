import { Scene } from 'three';
import React from 'react';
import GeoContainer from './geoContainer';
import { NUM_VERTEX, } from './ConnectedGraphConstants';

export default class ConnectedGraph {

  constructor() {
    this.scene = new Scene();
    this.geoContainer = new GeoContainer(NUM_VERTEX);
    this.geoContainer.getMeshList().forEach(mesh => this.scene.add(mesh));
    this.lastRenderTime = performance.now();
    this.totalTime = 0;
  }

  update(elapsedTime) {
    this.totalTime += elapsedTime;
    this.geoContainer.update(elapsedTime, this.totalTime);
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

}
