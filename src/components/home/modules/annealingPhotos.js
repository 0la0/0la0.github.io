import {
  Scene,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();
    const geometry = new PlaneGeometry(0.2, 0.2);
    const material = new MeshBasicMaterial({color: 0xFFFFFF});
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  render(renderer, camera) {
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return 'TODO: about simulated annealing';
  }
}
