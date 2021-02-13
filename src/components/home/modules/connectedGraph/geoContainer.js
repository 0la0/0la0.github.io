import { Vector3, } from 'three';
import Vertex from './vertex';
import Edge from './Edge';
import VertexRenderer from './VertexRenderer';
import EdgeRenderer from './EdgeRenderer';
import { GRAPHICS_SPACE_BOUNDS, ROTATION_SPEED, } from './ConnectedGraphConstants';
import {
  getRandomFloatInRange,
  getRandomIntegerInRange,
  getRandomVector,
  getPosNeg,
} from '../mathUtil';

function traverse(vertex) {
  if (vertex.isVisited) {
    return;
  }
  vertex.isVisited = true;
  vertex.edges.forEach(vertex => traverse(vertex));
}

export default class GeoContainer {
  constructor(numVertex) {
    this.rotation = new Vector3(
      getPosNeg() * getRandomFloatInRange(ROTATION_SPEED),
      getPosNeg() * getRandomFloatInRange(ROTATION_SPEED),
      getPosNeg() * getRandomFloatInRange(ROTATION_SPEED)
    );
    this.seedPositions = new Array(numVertex / 2).fill(null).map(() => getRandomVector(GRAPHICS_SPACE_BOUNDS));
    this.vertices = new Array(numVertex).fill(null).map(() => new Vertex());
    this.vertices.forEach(vertex => {
      const positionIndex = getRandomIntegerInRange(this.seedPositions.length);
      vertex.setCentroid(this.seedPositions[positionIndex]);
    });
    this.vertexRenderer = new VertexRenderer(this.vertices);
    this.edges = [];
    this.vertices.forEach((vertex, index, array) => {
      const connectingVertices = this.vertices.slice(index + 1);
      connectingVertices.forEach(nextVertex => {
        if (Math.random() < 0.1) {
          this.edges.push(new Edge(vertex, nextVertex));
          vertex.addEdge(nextVertex);
        }
      });
    });

    // connect unconnected vertices
    traverse(this.vertices[0]);
    const visitedIndices = this.vertices.filter(v => v.isVisited).map((e, i) => i);
    const unvisited = this.vertices.filter(vertex => !vertex.isVisited);
    unvisited.forEach(unvisited => {
      const parentIndex = visitedIndices[getRandomIntegerInRange(visitedIndices.length)];
      const parentVertex = this.vertices[parentIndex];
      this.edges.push(new Edge(parentVertex, unvisited));
      parentVertex.edges.push(unvisited);
    });
    
    this.edgeRenderer = new EdgeRenderer(this.edges);
    this.frequency = 0.001 + getRandomFloatInRange(0.003);
    this.vertices[0].independence = 1;
    this.vertices[0].position.copy(this.vertices[0].goal);
  }

  getMeshList() {
    return [
      this.vertexRenderer.getMesh(),
      this.edgeRenderer.getMesh(),
    ];
  }

  update(elapsedTime, totalTime) {
    const rotation = this.rotation.clone().multiplyScalar(elapsedTime);
    const x = this.frequency * totalTime;
    this.vertices.forEach(vertex => vertex.update(elapsedTime, x));
    this.edges.forEach(edge => edge.update(elapsedTime, x));
    this.vertexRenderer.update(this.vertices, elapsedTime, rotation);
    this.edgeRenderer.update(this.edges, elapsedTime, rotation);
  }
}
