import Point from './Point';
import MovablePoint from './MoveablePoint';

const SVG = {
  MIN: 30,
  MID: 50,
  MAX: 70,
};

export default class Line {
  constructor(isDefault) {
    this.isDefault = isDefault;
    this.points = [
      new MovablePoint(10, SVG.MIN, SVG.MAX, isDefault),
      new MovablePoint(SVG.MID, SVG.MIN, SVG.MAX, isDefault),
      new Point(SVG.MID, SVG.MID),
      new MovablePoint(90, SVG.MAX, SVG.MIN, isDefault),
    ];
    this.isFinished = false;
    this.finishTransform();
  }

  toggleState() {
    this.isFinished = false;
    this.isDefault = !this.isDefault;
    this.points.forEach(p => p.setState(this.isDefault));
  }

  animate(percentTime) {
    this.points.forEach(p => p.transform(percentTime));
  }

  finishTransform() {
    if (this.isFinished) { return; }
    this.points.forEach(p => p.finishTransform());
    this.isFinished = true;
  }

  getEndPoint() {
    return {
      cx: this.points[3].x,
      cy: this.points[3].y
    };
  }

  toString() {
    return `M${this.points[0].toString()} Q ${this.points[1].toString()}, ${this.points[2].toString()} T ${this.points[3].toString()}`
  }
}