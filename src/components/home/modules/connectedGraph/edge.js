import { Color, } from 'three';
import themeStore from '../../../modules/ThemeStore';

const COLOR_FACTOR = 0.4;

export default class Edge {
  constructor(v1, v2) {
    this.r = COLOR_FACTOR * Math.random();
    this.g = COLOR_FACTOR * Math.random();
    this.b = COLOR_FACTOR * Math.random();
    this.color = new Color(1 - this.r, 1 - this.g, 1 - this.b);
    this.v1 = v1;
    this.v2 = v2;
    this.p1 = this.v1.getPosition();
    this.p2 = this.v2.getPosition();
    this.amplitude = 0.5 + 0.5 * Math.random();
  }

  update(elapsedTime, totalTime) {
    const COLOR_FACTOR = 0.5 + this.amplitude * Math.sin(totalTime) + 0.5;
    const p1 = this.v1.getPosition();
    const p2 = this.v2.getPosition();
    this.p1.set(p1.x, p1.y, p1.z);
    this.p2.set(p2.x, p2.y, p2.z);
    if (themeStore.isDark()) {
      this.color.r = 1 - COLOR_FACTOR * this.r;
      this.color.g = 1 - COLOR_FACTOR * this.g;
      this.color.b = 1 - COLOR_FACTOR * this.b;
    } else {
      this.color.r = COLOR_FACTOR * this.r;
      this.color.g = COLOR_FACTOR * this.g;
      this.color.b = COLOR_FACTOR * this.b;
    }
  }
}
