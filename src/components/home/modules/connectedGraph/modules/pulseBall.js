import {
  Vector3,
  SphereGeometry,
  LineBasicMaterial,
  Mesh
} from 'three';
import { getPosNeg } from 'components/home/modules/mathUtil';

const ELAPSED_TIME_FACTOR = 0.02;
const CENTROID_FACTOR = 0.5;

const TTL = 300;

export default class PulseBall {
  constructor() {
    const geometry = new SphereGeometry(0.01, 6, 6);
    const material = new LineBasicMaterial({color: 0x2255CC});
    this.mesh = new Mesh(geometry, material);
  }

  reset(v1, v2) {
    this.v1 = v1;
    this.v2 = v2;
    this.ttl = TTL;
  }

  setPosition(position) {
    this.mesh.position.copy(position);
  }

  update(elapsedTime) {
    this.ttl -= elapsedTime;
    const percent = 1 - this.ttl / TTL;
    this.mesh.position.copy(
      this.v1.getPosition().lerp(this.v2.getPosition(), percent)
    );

    // this.mesh.position.copy(this.v1.getPosition());
  }
}
