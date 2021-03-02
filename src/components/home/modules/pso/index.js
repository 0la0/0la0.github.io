import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  Scene,
  Vector2,
} from 'three';
import React from 'react';
import Population from './Population';
import PsoRenderer from './PsoRenderer';
import { getRandomIntegerInRange, getRandomFloatInRange, } from '../mathUtil';

export default class Pso {
  constructor() {
    this.scene = new Scene();
    this.populations = [
      new Population(60 + getRandomIntegerInRange(25)),
      new Population(50 + getRandomIntegerInRange(25)),
      new Population(40 + getRandomIntegerInRange(25))
    ];
    this.clickIntercept = new Mesh(new PlaneGeometry(10, 10), new MeshBasicMaterial());
    this.clickIntercept.visible = false;
    const allParticles = this.populations.flatMap(population => population.getParticles());
    this.allParticles = allParticles;
    this.psoRenderer = new PsoRenderer(allParticles);
    this.scene.add(this.psoRenderer.getMesh());
    this.scene.add(this.clickIntercept);
    this.lastRenderTime = performance.now();
    this.resetIndex = 0;
    this.raycaster = new Raycaster();
  }

  render(renderer, camera, now) {
    const elapsedTime = Math.min(now - this.lastRenderTime, 100);
    this.lastRenderTime = now;
    this.populations.forEach(population => population.update(elapsedTime));
    this.psoRenderer.update(this.allParticles);
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return (
      <p>
        This animation is a visualization of the&nbsp;
        <a href="https://en.wikipedia.org/wiki/Particle_swarm_optimization">
          Particle Swarm Optimization
        </a> algorithm.
        The visualization is in 12 dimensions:
        location (x, y, z), rotation (x, y, z), scale (x, y, z), and color (r, g, b).
        There are three swams each with independent goal states.
        It is a web based version of a &nbsp;
        <a href="#/projects/psoViz">
          previous project I worked on.
        </a>
        &nbsp;
        <a href="https://github.com/0la0/0la0.github.io/tree/develop/src/components/home/modules/pso">
          View Source
        </a>
      </p>
    );
  }

  start() {
    this.lastRenderTime = performance.now();
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
    this.populations[this.resetIndex].resetToPosition(clickPoint);
    this.resetIndex = (this.resetIndex + 1) % this.populations.length;
  }
}
