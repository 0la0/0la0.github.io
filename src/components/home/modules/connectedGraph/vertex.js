import { Vector3, } from 'three';
import { getRandomVector } from 'components/home/modules/mathUtil';

const ELAPSED_TIME_FACTOR = 0.02;
const CENTROID_FACTOR = 0.5;

export default class Vertex {
  constructor() {
    this.position = new Vector3();
    this.amplitude = 0.01 * Math.random();
    this.reset();
  }

  reset() {
    this.centroid = getRandomVector(CENTROID_FACTOR);
    this.goal = this.centroid.clone();
  }

  getPosition() {
    return this.position;
  }

  update(elapsedTime, totalTime) {
    this.position.add(
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
