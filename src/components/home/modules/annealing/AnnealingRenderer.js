import {
  DoubleSide,
  InstancedBufferAttribute,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  PlaneBufferGeometry,
  Vector3,
} from 'three';
import { PARTICLE_SIZE, } from './AnnealingConstants';

const scaleOn = new Vector3(1, 1, 1);
const scaleOff = new Vector3(0, 0, 0);

export default class AnnealingRenderer {
  constructor(particles) {  
    const geometry = new PlaneBufferGeometry(PARTICLE_SIZE, PARTICLE_SIZE);
    const material = new MeshBasicMaterial({ side: DoubleSide });
    this.particles = particles;
    this.colorBuffer = new Float32Array(particles.length * 3);
    this.particleMesh = new InstancedMesh(geometry, material, particles.length);
    this.particleMesh.material.vertexColors = true;
  }

  getMesh() {
    return this.particleMesh;
  }

  update() {
    const objectProxy = new Object3D();
    this.particles.forEach((particle, index) => {
      const position = particle.getPosition();
      const colorIndex = index * 3;
      const color = particle.greyScaleValue;
      const visibilityScale = particle.isVisible ? scaleOn : scaleOff;
      this.colorBuffer[colorIndex] = color;
      this.colorBuffer[colorIndex + 1] = color;
      this.colorBuffer[colorIndex + 2] = color;
      objectProxy.position.copy(position);
      objectProxy.scale.copy(visibilityScale);
      objectProxy.updateMatrix();
      this.particleMesh.setMatrixAt(index, objectProxy.matrix);  
    });
    this.particleMesh.geometry.setAttribute('color', new InstancedBufferAttribute(this.colorBuffer, 3));
    this.particleMesh.instanceMatrix.needsUpdate = true;
  }
}
