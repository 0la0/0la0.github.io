import {
  FrontSide,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  SphereBufferGeometry,
  Color,
} from 'three';
import { VERTEX_RADIUS, } from './ConnectedGraphConstants';

export default class VertexRenderer {
  constructor(vertices, rotation) {
    const sphereGeometry = new SphereBufferGeometry(VERTEX_RADIUS, 6, 6)
    const sphereMaterial = new MeshBasicMaterial({ side: FrontSide, color: new Color(0.75, 0.8, 0.95), });
    this.colorBuffer = new Float32Array(vertices.length * 3);
    this.sphereMesh = new InstancedMesh(sphereGeometry, sphereMaterial, vertices.length);
    this.rotation = rotation;
  }

  getMesh() {
    return this.sphereMesh;
  }

  update(vertices, elapsedTime, rotation) {
    const objectProxy = new Object3D();
    const updatedRotation = this.sphereMesh.rotation.toVector3().add(rotation);
    vertices.forEach((vertex, index) => {
      const position = vertex.getPosition();
      objectProxy.position.copy(position);
      objectProxy.updateMatrix();
      this.sphereMesh.setMatrixAt(index, objectProxy.matrix);  
    });
    this.sphereMesh.instanceMatrix.needsUpdate = true;
    this.sphereMesh.rotation.setFromVector3(updatedRotation);
  }
}
