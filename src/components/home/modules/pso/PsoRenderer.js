import {
  DoubleSide,
  InstancedBufferAttribute,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  TetrahedronBufferGeometry,
} from 'three';
import { getDisplayPropertiesFromSearchState, } from './SearchStateToDisplayTransform';

export default class PsoRenderer {
  constructor(particles) {
    const triangleGeometry = new TetrahedronBufferGeometry(0.15)
    const triangleMaterial = new MeshBasicMaterial({ side: DoubleSide, });
    this.colorBuffer = new Float32Array(particles.length * 3);
    this.triangleMesh = new InstancedMesh(triangleGeometry, triangleMaterial, particles.length);
    this.triangleMesh.material.vertexColors = true;
  }

  getMesh() {
    return this.triangleMesh;
  }

  update(particles) {
    const objectProxy = new Object3D();
    particles.forEach((particle, index) => {
      const { position, rotation, scale, color, } = getDisplayPropertiesFromSearchState(particle.getState());
      const colorIndex = index * 3;
      this.colorBuffer[colorIndex] = color.r;
      this.colorBuffer[colorIndex + 1] = color.g;
      this.colorBuffer[colorIndex + 2] = color.b;
      objectProxy.position.copy(position);
      objectProxy.scale.copy(scale);
      objectProxy.setRotationFromEuler(rotation);
      objectProxy.updateMatrix();
      this.triangleMesh.setMatrixAt(index, objectProxy.matrix);  
    });
    this.triangleMesh.geometry.setAttribute('color', new InstancedBufferAttribute(this.colorBuffer, 3));
    this.triangleMesh.instanceMatrix.needsUpdate = true;
  }
}
