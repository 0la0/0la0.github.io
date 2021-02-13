import {
  Color,
  CylinderBufferGeometry,
  FrontSide,
  InstancedBufferAttribute,
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
    const cylinderMaterial = new MeshBasicMaterial({ side: FrontSide, });
    cylinderGeometry.translate(0, HEIGHT / 2, 0);
    cylinderMaterial.transparent = true;
    cylinderMaterial.opacity = 0.5;
    this.cylinderMesh = new InstancedMesh(cylinderGeometry, cylinderMaterial, edges.length);
    this.colorBuffer = new Float32Array(edges.length * 3);
    this.cylinderMesh.material.vertexColors = true;
  }

  getMesh() {
    return this.cylinderMesh;
  }

  update(edges) {
    const objectProxy = new Object3D();
    const quaternion = new Quaternion();
    edges.forEach((edge, index) => {
      const colorIndex = index * 3;
      const distance = edge.p1.distanceTo(edge.p2);
      const direction = edge.p2.clone().sub(edge.p1.clone());
      const scale = new Vector3(1, distance, 1);
      quaternion.setFromUnitVectors(axis, direction.clone().normalize());
      objectProxy.setRotationFromQuaternion(quaternion);
      objectProxy.position.copy(edge.p1);
      objectProxy.scale.copy(scale);
      objectProxy.updateMatrix();
      this.cylinderMesh.setMatrixAt(index, objectProxy.matrix);  
      this.colorBuffer[colorIndex] = edge.color.r;
      this.colorBuffer[colorIndex + 1] = edge.color.g;
      this.colorBuffer[colorIndex + 2] = edge.color.b;
    });
    this.cylinderMesh.geometry.setAttribute('color', new InstancedBufferAttribute(this.colorBuffer, 3));
    this.cylinderMesh.instanceMatrix.needsUpdate = true;
  }
}
