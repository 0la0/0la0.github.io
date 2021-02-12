import Vertex from './vertex';
import Edge from './Edge';
import VertexRenderer from './VertexRenderer';
import EdgeRenderer from './EdgeRenderer';

export default class GeoContainer {
  constructor(numVertex) {
    this.vertices = new Array(numVertex).fill(null).map(() => new Vertex());
    this.vertexRenderer = new VertexRenderer(this.vertices);
    this.edges = [];
    this.vertices.forEach((vertex, index, array) => {
      const connectingVertices = this.vertices.slice(index + 1);
      connectingVertices.forEach(nextVertex => {
        if (Math.random() < 0.3) {
          this.edges.push(new Edge(vertex, nextVertex));
        }
      });
    });
    this.edgeRenderer = new EdgeRenderer(this.edges);
  }

  getMeshList() {
    return [
      this.vertexRenderer.getMesh(),
      this.edgeRenderer.getMesh(),
    ];
  }

  update(elapsedTime, totalTime) {
    const x = this.frequency * totalTime;
    this.vertices.forEach(vertex => vertex.update(elapsedTime, x));
    this.edges.forEach(edge => edge.update(elapsedTime, x));
    this.vertexRenderer.update(this.vertices);
    this.edgeRenderer.update(this.edges);
    
  }

  reset() {
    this.vertices.forEach(vertex => vertex.reset());
    this.frequency = 0.005 * Math.random();
  }

}
