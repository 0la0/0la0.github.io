import {
  FrontSide,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  SphereBufferGeometry,
  Color,
} from 'three';

const RADIUS = 0.01;

export default class VertexRenderer {
  constructor(vertices) {
    const sphereGeometry = new SphereBufferGeometry(RADIUS, 6, 6)
    const sphereMaterial = new MeshBasicMaterial({ side: FrontSide, color: new Color(0.7, 0.75, 0.8), });
    this.colorBuffer = new Float32Array(vertices.length * 3);
    this.sphereMesh = new InstancedMesh(sphereGeometry, sphereMaterial, vertices.length);
  }

  getMesh() {
    return this.sphereMesh;
  }

  update(vertices) {
    const objectProxy = new Object3D();
    vertices.forEach((vertex, index) => {
      const position = vertex.getPosition();
      objectProxy.position.copy(position);
      objectProxy.updateMatrix();
      this.sphereMesh.setMatrixAt(index, objectProxy.matrix);  
    });
    this.sphereMesh.instanceMatrix.needsUpdate = true;
  }
}
