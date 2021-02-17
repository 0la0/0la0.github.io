import {
  FrontSide,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  SphereBufferGeometry,
  Color,
} from 'three';
import { VERTEX_RADIUS, } from './ConnectedGraphConstants';
import themeStore from '../../../modules/ThemeStore';

const themedColors = {
  light: new Color(0.05, 0.2, 0.25),
  dark: new Color(0.75, 0.8, 0.95),
};

const getThemedColor = () => themeStore.isLight() ? themedColors.light : themedColors.dark;

export default class VertexRenderer {
  constructor(vertices) {
    const color = getThemedColor();
    const sphereGeometry = new SphereBufferGeometry(VERTEX_RADIUS, 6, 6)
    const sphereMaterial = new MeshBasicMaterial({ side: FrontSide, color, });
    this.colorBuffer = new Float32Array(vertices.length * 3);
    this.sphereMesh = new InstancedMesh(sphereGeometry, sphereMaterial, vertices.length);
    themeStore.subscribe(this);
  }

  handleThemeChange(theme) {
    const color = getThemedColor();
    this.sphereMesh.material.color = color
    this.sphereMesh.material.needsUpdate = true;
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
