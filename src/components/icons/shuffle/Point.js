export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  transform() {}

  setState() {}

  finishTransform() {}

  toString() {
    return `${this.x} ${this.y}`;
  }
}
