import { Vector2, } from 'three';
import Point from './Point';

export default class MovablePoint extends Point {
  constructor(x, y1, y2, isDefault) {
    super(x, y1);
    this.original = new Vector2(x, y1);
    this.other = new Vector2(x, y2);
    this.isDefault = isDefault;
  }

  transform(percent) {
    const p = this.isDefault ?
      this.other.clone().lerp(this.original, percent) :
      this.original.clone().lerp(this.other, percent);
    this.x = p.x;
    this.y = p.y;
  }

  finishTransform() {
    this.x = this.isDefault ? this.original.x : this.other.x;
    this.y = this.isDefault ? this.original.y : this.other.y;
  }

  setState(isDefault) {
    this.isDefault = isDefault;
  }
}
