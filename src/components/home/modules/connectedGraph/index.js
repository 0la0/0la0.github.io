import { Scene } from 'three';
import GeoContainer from './modules/geoContainer';
import React from 'react';

const NUM_VERTEX = 50;

export default class ConnectedGraph {

  constructor() {
    this.scene = new Scene();
    this.geoContainer = new GeoContainer(NUM_VERTEX);
    this.geoContainer.getMeshList().forEach(mesh => this.scene.add(mesh));
    this.lastRenderTime = performance.now();
    this.totalTime = 0;
    this.reset();
  }

  reset() {
    this.geoContainer.reset();
    this.timeToReset = 2000 + 9000 * Math.random();
  }

  update(elapsedTime) {
    this.totalTime += elapsedTime;
    this.timeToReset -= elapsedTime;
    this.geoContainer.update(elapsedTime, this.totalTime);
    if (this.timeToReset <= 0) {
      this.reset();
    }
  }

  render(renderer, camera) {
    const elapsedTime = performance.now() - this.lastRenderTime;
    this.lastRenderTime = performance.now();
    this.update(elapsedTime);
    renderer.render(this.scene, camera);
  }

  start() {
    this.lastRenderTime = performance.now();
    this.totalTime = 0;
  }

  getAboutAnimationText() {
    return(
      <div>
        This is about connected graphs
      </div>
    );
  }

}
