import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  Vector3
} from 'three';
import { getPosNeg } from 'components/home/modules/mathUtil';

const ELAPSED_TIME_FACTOR = 0.0002;

class Particle {
  constructor(size, color, position) {
    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshBasicMaterial({ color });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.direction = new Vector3();
  }

  setDirection(centroid) {
    this.directionToCenter = centroid.clone().sub(this.mesh.position).normalize();
  }

  update(elapsedTime) {
    this.mesh.position.add(
      this.directionToCenter.clone().multiplyScalar(elapsedTime)
    );
  }

  getMesh() {
    return this.mesh;
  }
}

export default class Gravity {
  constructor() {
    this.scene = new Scene();

    this.particles = new Array(10).fill(null).map(() => {
      const size = 0.1;
      const greyScaleValue = Math.random();
      const color = new Color(greyScaleValue, greyScaleValue, greyScaleValue);
      const position = new Vector3(
        getPosNeg() * 1 * Math.random(),
        getPosNeg() * 1 * Math.random(),
        getPosNeg() * 1 * Math.random()
      );
      return new Particle(size, color, position);
    });

    this.particles.forEach(particle => this.scene.add(particle.getMesh()));
    this.lastRenderTime = performance.now();


    const centroid = this.particles.reduce((sum, particle) => {
      sum.add(particle.getMesh().position);
      return sum;
    }, new Vector3());
    centroid.multiplyScalar(1 / this.particles.length);

    this.particles.forEach(particle => particle.setDirection(centroid));
  }

  update(elapsedTime) {
    const scaledElapsedTime = elapsedTime * ELAPSED_TIME_FACTOR;
    this.particles.forEach(particle => particle.update(scaledElapsedTime));
  }

  render(renderer, camera) {
    const elapsedTime = performance.now() - this.lastRenderTime;
    this.lastRenderTime = performance.now();
    this.update(elapsedTime);
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return 'This is an animation about gravity';
  }

  start() {
    this.lastRenderTime = performance.now();
  }
}
