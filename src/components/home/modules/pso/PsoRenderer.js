import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Euler,
  InstancedBufferAttribute,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  Vector3,
} from 'three';
import DIMENSIONS from './Dimensions';

const TWO_PI = 2 * Math.PI;

function getPropertiesForState(searchState) {
  return {
    position: new Vector3(
      searchState.vector[DIMENSIONS.POSITION_X],
      searchState.vector[DIMENSIONS.POSITION_Y],
      searchState.vector[DIMENSIONS.POSITION_Z]
    ),
    rotation: new Euler(
      (searchState.vector[DIMENSIONS.ROTATE_X] + 0.5) * TWO_PI,
      (searchState.vector[DIMENSIONS.ROTATE_Y] + 0.5) * TWO_PI,
      (searchState.vector[DIMENSIONS.ROTATE_Z] + 0.5) * TWO_PI,
      'XYZ'
    ),
    scale: new Vector3(
      searchState.vector[DIMENSIONS.SCALE_X] + 1,
      searchState.vector[DIMENSIONS.SCALE_Y] + 1,
      searchState.vector[DIMENSIONS.SCALE_Z] + 1
    ),
    color: new Color(
      searchState.vector[DIMENSIONS.COLOR_R] + 0.5,
      searchState.vector[DIMENSIONS.COLOR_G] + 0.5,
      searchState.vector[DIMENSIONS.COLOR_B] + 0.5
    ),
  };
}

function buildTriangleGeometry(size) {
  const triangleGeometry = new BufferGeometry();
  const positions = new Float32Array([
    -size, -size, 0,
    -size, size, 0,
    size, size, 0
  ]);
  triangleGeometry.setAttribute('position', new BufferAttribute(positions, 3));
  triangleGeometry.computeVertexNormals();
  return triangleGeometry;
}

function buildPopulationMesh(particles) {
  const numParticles = particles.length;
  const objectProxy = new Object3D();
  const triangleGeometry = new buildTriangleGeometry(0.1);
  const triangleMaterial = new MeshBasicMaterial({ side: DoubleSide, });
  const colorBuffer = new Float32Array(numParticles * 3);
  const triangleMesh = new InstancedMesh(triangleGeometry, triangleMaterial, numParticles);
  triangleMesh.material.vertexColors = true;

  // particles.forEach((particle, index) => {
  //   const {
  //     position,
  //     rotation,
  //     scale,
  //     color,
  //   } = getPropertiesForState(particle.getState());
    
  //   const colorIndex = index * 3;
  //   colorBuffer[colorIndex] = color.r;
  //   colorBuffer[colorIndex + 1] = color.g;
  //   colorBuffer[colorIndex + 2] = color.b;
  //   objectProxy.position.copy(position);
  //   objectProxy.scale.copy(scale);
  //   objectProxy.setRotationFromEuler(rotation);
  //   objectProxy.updateMatrix();
  //   triangleMesh.setMatrixAt(index, objectProxy.matrix);  
  // });
  // triangleMesh.geometry.setAttribute('color', new InstancedBufferAttribute(colorBuffer, 3));
  // triangleMesh.instanceMatrix.needsUpdate = true;

  return {
    colorBuffer,
    triangleMesh,
  };
}

export default class PsoRenderer {
  constructor(particles) {
    const { colorBuffer, triangleMesh, } = buildPopulationMesh(particles);
    this.colorBuffer = colorBuffer;
    this.triangleMesh = triangleMesh;
  }

  getMesh() {
    return this.triangleMesh;
  }

  update(particles) {
    const objectProxy = new Object3D();

    particles.forEach((particle, index) => {
      const {
        position,
        rotation,
        scale,
        color,
      } = getPropertiesForState(particle.getState());
      
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
