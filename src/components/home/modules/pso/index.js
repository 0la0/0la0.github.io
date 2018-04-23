import { Scene } from 'three';
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
    return 'This is an animation about PSO';
  }

  start() {
    this.lastRenderTime = performance.now();
  }
}
