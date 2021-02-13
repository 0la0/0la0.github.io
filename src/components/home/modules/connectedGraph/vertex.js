import { Vector3, } from 'three';
import { getRandomIntegerInRange, getRandomVector } from 'components/home/modules/mathUtil';
import { GRAPHICS_SPACE_BOUNDS, } from './ConnectedGraphConstants';

const ELAPSED_TIME_FACTOR = 0.02;

export default class Vertex {
  constructor() {
    this.position = new Vector3();
    this.amplitude = 0.01 * Math.random();
    this.timeToReset = 0;
    this.centroid = getRandomVector(GRAPHICS_SPACE_BOUNDS);
    this.goal = this.centroid.clone();
    this.edges = [];
    this.attraction = 0.8 * Math.random();
  }

  reset() {
    const moveToNeighborVertex = this.edges.find(edge => Math.random() < edge.attraction);
    if (Math.random() < 0.67 && moveToNeighborVertex) {
      const edgeIndex = getRandomIntegerInRange(this.edges.length);
      const targetVertex = this.edges[edgeIndex];
      this.centroid = targetVertex.centroid.clone();
    } else {
      this.centroid = getRandomVector(GRAPHICS_SPACE_BOUNDS);
    }
    this.goal = this.centroid.clone();
    this.timeToReset = 2000 + getRandomIntegerInRange(20000);

    if (Math.random() < 0.34) {
      this.position.copy(this.goal);
    }
  }

  addEdge(vertex) {
    this.edges.push(vertex);
  }

  getPosition() {
    return this.position;
  }

  setCentroid(vector) {
    this.centroid = vector.clone();
    this.goal = this.centroid.clone();
  }

  update(elapsedTime, totalTime) {
    this.isVisited = true;
    this._moveToGoal(elapsedTime, totalTime);
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
    );
    // oscillate around centroid:
    const centroid = this.centroid.clone();
    this.goal.copy(
      centroid.add(centroid.clone().normalize().multiplyScalar(
        this.amplitude * Math.sin(totalTime)
      ))
    );
  }
}
