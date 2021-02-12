import { Scene } from 'three';
import React from 'react';
import GeoContainer from './geoContainer';

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
        An animation of a pulsating &nbsp;
        <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">
          Graph
        </a>.&nbsp;
        <a href="https://github.com/0la0/0la0.github.io/tree/develop/src/components/home/modules/connectedGraph">
          View Source
        </a>
      </p>
    );
  }

}
