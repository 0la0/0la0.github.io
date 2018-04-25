import {
  Vector3,
  SphereGeometry,
  LineBasicMaterial,
  Mesh
} from 'three';
import { getPosNeg } from 'components/home/modules/mathUtil';

const ELAPSED_TIME_FACTOR = 0.02;
const CENTROID_FACTOR = 0.5;

export default class Vertex {

  constructor() {
    const geometry = new SphereGeometry(0.003, 6, 6);
    const material = new LineBasicMaterial({color: 0xABB2Bf});
    this.mesh = new Mesh(geometry, material);
    this.amplitude = 0.01 * Math.random();
    this.reset();
  }

  reset() {
    this.centroid = this.goal = new Vector3(
      CENTROID_FACTOR * getPosNeg() * Math.random(),
      CENTROID_FACTOR * getPosNeg() * Math.random(),
      CENTROID_FACTOR * getPosNeg() * Math.random()
    );
    this.goal = this.centroid.clone();
  }

  getPosition() {
    return this.mesh.position.clone();
  }

  update(elapsedTime, totalTime) {
    this.mesh.position.add(
      this.goal.clone()
        .sub(this.getPosition())
        .multiplyScalar(ELAPSED_TIME_FACTOR * Math.random() * elapsedTime)
    );
    const centroid = this.centroid.clone();
    this.goal.copy(
      centroid.add(centroid.clone().normalize().multiplyScalar(
        this.amplitude * Math.sin(totalTime)
      ))
    );
  }

}
