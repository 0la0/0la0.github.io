import { Vector3 } from 'three';

export default class Particle {
  constructor(position, ttlDuration) {
    this.position = position;
    this.scale = new Vector3(0, 0, 0);
    this.ttlDuration = ttlDuration + Math.floor(2000 * Math.random());
    this.ttl = 0;
  }

  turnOn() {
    this.scale = new Vector3(1, 1, 1);
    this.ttl = this.ttlDuration;
  }

  update(elapsedTime)  {
    if (!this.ttl) {
      return;
    }
    const percent = this.ttl / this.ttlDuration;
    this.scale.set(percent, percent, percent);
    this.ttl -= elapsedTime;
    if (this.ttl <= 0) {
      this.ttl = 0;
      this.scale.set(0, 0, 0);
    }
  }
}