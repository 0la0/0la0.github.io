import { Scene } from 'three';
import React from 'react';
import PointRenderer from './PointRenderer';

export default class Gps {
  constructor() {
    this.scene = new Scene();
    this.lastRenderTime = performance.now();
    this.totalTime = 0;

    // TODO: move activities to assets, filter points, scrub unnecessary data
    fetch('temp-gps-data.json')
      .then(data => data.json())
      .then(profile => this.init(profile))
      .catch(error => console.log(error));
  }

  init(profile) {
    this.pointRenderer = new PointRenderer(profile);
    this.scene.add(this.pointRenderer.getMesh());
  }

  update(elapsedTime) {
    this.totalTime += elapsedTime;
    this.pointRenderer?.update(elapsedTime);
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
        GPS
        <br />
        {/* <a href="https://github.com/0la0/0la0.github.io/tree/develop/src/components/home/modules/connectedGraph">
          View Source
        </a> */}
      </p>
    );
  }

  onClick() {}
}
