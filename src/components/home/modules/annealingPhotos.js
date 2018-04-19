import {
  Color,
  Scene,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { getPosNeg } from 'components/home/modules/mathUtil';

const NUM_CANDIDATES = 2000;
const NUM_ACTIVE_CANDIDATES = 100;

function getRandomMesh() {
  const scale = 0.2 * 0.3 * Math.random();
  const color = Math.random();
  const geometry = new PlaneGeometry(scale, scale);
  const material = new MeshBasicMaterial({ color: new Color(color, color, color)});
  const mesh = new Mesh(geometry, material);
  mesh.position.x = getPosNeg() * 0.5 * Math.random();
  mesh.position.y = getPosNeg() * 0.5 * Math.random();
  mesh.position.z = getPosNeg() * 0.2 * Math.random();
  return mesh;
}

class AnnealingSolution {
  constructor() {
    this.mesh = getRandomMesh();
    this.frameCount = 0;
    this.ttl = Math.floor(100 * Math.random());
  }

  iterate() {
    this.frameCount++;
    this.mesh.position.x = getPosNeg() * 0.5 * Math.random();
    this.mesh.position.y = getPosNeg() * 0.5 * Math.random();
  };

  isSettled() {
    return this.frameCount > this.ttl;
  }

  getMesh() {
    return this.mesh;
  }
}

// https://github.com/0la0/0la0.github.io.source/blob/master/app/elements/home/simulated-annealing.html
export default class AnnealingPhotos {
  constructor() {
    this.scene = new Scene();
    this.candidateQueue = new Array(2000).fill(null).map(() => new AnnealingSolution());
    this.candidates = this.candidateQueue.splice(0, NUM_ACTIVE_CANDIDATES);
    this.candidates.forEach(candidate => this.scene.add(candidate.getMesh()));
  }

  update() {
    const settledCandidates = this.candidates.filter(candidate => candidate.isSettled());
    this.candidates = this.candidates.filter(candidate => !candidate.isSettled());
    this.candidates.forEach((candidate) => candidate.iterate());
    const newCandidates = this.candidateQueue.splice(0, settledCandidates.length);
    newCandidates.forEach(candidate => {
      this.candidates.push(candidate);
      this.scene.add(candidate.getMesh())
    });
  }

  render(renderer, camera) {
    this.update();
    renderer.render(this.scene, camera);
  }

  getAboutAnimationText() {
    return 'TODO: about simulated annealing';
  }
}
