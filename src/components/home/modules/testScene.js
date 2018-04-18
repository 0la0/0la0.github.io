import {
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
} from 'three';

export default class TestScene {
  constructor() {
    this.scene = new Scene();
    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  render(renderer, camera) {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return 'This is an animation about a single cube spinning';
  }
}
