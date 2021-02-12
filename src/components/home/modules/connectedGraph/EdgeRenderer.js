import {
  Color,
  CylinderBufferGeometry,
  FrontSide,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  Vector3,
} from 'three';

const RADIUS = 0.001;
const HEIGHT = 1;
const axis = new Vector3(0, 1, 0);

export default class EdgeRenderer {
  constructor(edges) {
    const cylinderGeometry = new CylinderBufferGeometry(RADIUS, RADIUS, HEIGHT, 3);
    const cylinderMaterial = new MeshBasicMaterial({ side: FrontSide, color: new Color(0.7, 0.75, 0.8), });
    cylinderGeometry.translate(0, HEIGHT / 2, 0);
    this.cylinderMesh = new InstancedMesh(cylinderGeometry, cylinderMaterial, edges.length);
  }

  getMesh() {
    return this.cylinderMesh;
  }

  update(edges) {
    const objectProxy = new Object3D();
    const quaternion = new Quaternion();
    edges.forEach((edge, index) => {
      const distance = edge.p1.distanceTo(edge.p2);
      const direction = edge.p2.clone().sub(edge.p1.clone());
      quaternion.setFromUnitVectors(axis, direction.clone().normalize());
      
      const scale = new Vector3(1, distance, 1);
      objectProxy.setRotationFromQuaternion(quaternion);
      objectProxy.position.copy(edge.p1);
      objectProxy.scale.copy(scale);
      
      objectProxy.updateMatrix();
      this.cylinderMesh.setMatrixAt(index, objectProxy.matrix);  
    });
    this.cylinderMesh.instanceMatrix.needsUpdate = true;
  }
}
