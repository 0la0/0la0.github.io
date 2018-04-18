import {
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
} from 'three';

export default class TestScene2 {
  constructor() {
    this.scene = new Scene();
    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);

    this.mesh1 = mesh.clone();
    this.mesh2 = mesh.clone();
    this.mesh1.position.x = 0.25;
    this.mesh2.position.x = -0.25;
    this.scene.add(this.mesh1);
    this.scene.add(this.mesh2);
  }

  render(renderer, camera) {
    this.mesh1.rotation.x += 0.01;
    this.mesh1.rotation.y += 0.02;
    this.mesh2.rotation.x -= 0.02;
    this.mesh2.rotation.y -= 0.01;
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return 'This is an animation about two cubes spinning';
  }
}
