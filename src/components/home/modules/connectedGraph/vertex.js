import { Vector3, } from 'three';
import { getRandomIntegerInRange, getRandomVector } from 'components/home/modules/mathUtil';

const ELAPSED_TIME_FACTOR = 0.02;
const CENTROID_FACTOR = 0.5;

export default class Vertex {
  constructor() {
    this.position = new Vector3();
    this.amplitude = 0.01 * Math.random();
    this.timeToReset = 0;
    this.centroid = getRandomVector(CENTROID_FACTOR);
    this.goal = this.centroid.clone();
    this.edges = [];
    this.independence = 0;
    this.isVisited = false;
  }

  reset() {
    this.centroid = getRandomVector(CENTROID_FACTOR);
    this.goal = this.centroid.clone();
    this.timeToReset = 2000 + getRandomIntegerInRange(20000);
  }

  addEdge(vertex) {
    this.edges.push(vertex);
  }

  getPosition() {
    return this.position;
  }

  // bindToParent(parentPosition) {
  //   if (this.isVisited) {
  //     return;
  //   }
  //   this.isVisited = true;
  //   this.position.copy(parentPosition);
  //   this.edges.forEach(v => v.bindToParent(parentPosition));
  // }

  // updateFromParent(elapsedTime, totalTime, parentPosition) {
  //   const independenceFactor = 0.0005;
  //   if (this.isVisited || this.independence >= 1) {
  //     // this.reset();
  //     return;
  //   }
  //   if (this.independence === 0) {
  //     this.bindToParent(parentPosition);
  //     this.independence += independenceFactor * elapsedTime;
  //     return;
  //   }
  //   this.isVisited = true;
  //   this.independence += independenceFactor * elapsedTime;
  // }

  update(elapsedTime, totalTime) {
    this.isVisited = true;
    this._moveToGoal(elapsedTime, totalTime);
    // if (this.independence >= 1) {
    //   this.edges
    //     .filter(vertex => !vertex.isVisited && vertex.independence < 1)
    //     .forEach(vertex => {
    //       vertex.updateFromParent(elapsedTime, totalTime, this.centroid.clone());
    //     });
    // }

    this.timeToReset -= elapsedTime;
    if (this.timeToReset <= 0) {
      this.reset();
    }
  }

  _moveToGoal(elapsedTime, totalTime) {
    this.position.add(
      this.goal.clone()
        .sub(this.getPosition())
        .multiplyScalar(ELAPSED_TIME_FACTOR * Math.random() * elapsedTime)
        // .multiplyScalar(ELAPSED_TIME_FACTOR * elapsedTime)
    );

    // oscillate:
    const centroid = this.centroid.clone();
    this.goal.copy(
      centroid.add(centroid.clone().normalize().multiplyScalar(
        this.amplitude * Math.sin(totalTime)
      ))
    );
  }

}
