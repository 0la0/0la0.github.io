import { Scene } from 'three';
import React from 'react';
import Population from './Population';

export default class Pso {
  constructor() {
    this.scene = new Scene();
    this.populations = [
      new Population(40),
      new Population(20),
      new Population(10)
    ];

    this.populations.forEach(population =>
      population.getMesh().forEach(mesh => this.scene.add(mesh)));
    this.lastRenderTime = performance.now();
  }

  render(renderer, camera) {
    const elapsedTime = performance.now() - this.lastRenderTime;
    this.lastRenderTime = performance.now();
    this.populations.forEach(population => population.update(elapsedTime));
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
}
