import { Scene } from 'three';
import React from 'react';
import Population from './Population';
import PsoRenderer from './PsoRenderer';

export default class Pso {
  constructor() {
    this.scene = new Scene();
    this.populations = [
      new Population(40),
      new Population(20),
      new Population(10)
    ];

    // this.populations.forEach(population =>
    //   population.getMesh().forEach(mesh => this.scene.add(mesh)));
    const allParticles = this.populations.flatMap(population => population.getParticles());
    this.psoRenderer = new PsoRenderer(allParticles);
    this.scene.add(this.psoRenderer.getMesh());
    this.lastRenderTime = performance.now();
  }

  render(renderer, camera, now) {
    const elapsedTime = Math.min(now - this.lastRenderTime, 100);
    this.lastRenderTime = now;
    this.populations.forEach(population => population.update(elapsedTime));
    const allParticles = this.populations.flatMap(population => population.getParticles());
    this.psoRenderer.update(allParticles);
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
