import Vertex from './vertex';
import Edge from './Edge';
import VertexRenderer from './VertexRenderer';
import EdgeRenderer from './EdgeRenderer';
import { getRandomFloatInRange, getRandomIntegerInRange, } from '../mathUtil';

// what about:
// at a given time, a vertex becomes bound "attracted" to one of its edge vertices
// so it collapses to the parent, then after a set time it is released to a new position  

function traversal(vertex) {
  if (vertex.isVisited) {
    return;
  }
  vertex.isVisited = true;
  vertex.edges.forEach(vertex => traversal(vertex));
}

export default class GeoContainer {
  constructor(numVertex) {
    this.vertices = new Array(numVertex).fill(null).map(() => new Vertex());
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
    traversal(this.vertices[0]);
    const visitedIndices = this.vertices.filter(v => v.isVisited).map((e, i) => i);
    const unvisited = this.vertices.filter(vertex => !vertex.isVisited);
    // const lastVisitedIndex = this.vertices.reduceRight((acc, ele, i) => {
    //   if (acc) {
    //     return acc;
    //   }
    //   if (ele.isVisited) {
    //     return i;
    //   }
    //   return acc;
    // }, 0)
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
    const x = this.frequency * totalTime;
    this.vertices.forEach(vertex => vertex.isVisited = false);
    this.vertices
      // .filter(vertex => vertex.independence >= 1)
      .forEach(vertex => vertex.update(elapsedTime, x));
    this.edges.forEach(edge => edge.update(elapsedTime, x));
    this.vertexRenderer.update(this.vertices);
    this.edgeRenderer.update(this.edges);
    
    // if (!this.vertices.some(v => v.independence <= 1)) {
    //   this.vertices.forEach((v, i) => {
    //     if (i === 0) {
    //       return;
    //     }
    //     if (Math.random() < 0.5) {
    //       v.independence = 0;
    //     }
    //   })
    // }
  }

  reset() {
    // this.vertices.forEach(vertex => vertex.reset());
    // this.frequency = 0.001 + getRandomFloatInRange(0.003);
  }

}
