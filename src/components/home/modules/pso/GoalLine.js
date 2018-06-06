import { Color, LineBasicMaterial, Geometry, Line } from 'three';
import DIMENSIONS from './Dimensions';

export default class GoalLine {
  constructor(p1, p2) {
    const geometry = new Geometry();
    const material = new LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
    });
    material.opacity = 0.2 + 0.2 * Math.random();
    this.p1 = p1;
    this.p2 = p2;
    geometry.vertices.push(this.p1);
    geometry.vertices.push(this.p2);
    this.line = new Line(geometry, material);
  }

  update(x, y, z) {
    this.p2.set(x, y, z);
    this.line.geometry.verticesNeedUpdate = true;
  }

  reset(goalVector) {
    this.p1.set(goalVector[0], goalVector[1], goalVector[2]);
    this.line.material.color = new Color(
      goalVector[DIMENSIONS.COLOR_R] + 0.5,
      goalVector[DIMENSIONS.COLOR_G] + 0.5,
      goalVector[DIMENSIONS.COLOR_B] + 0.5
    );
    this.line.geometry.verticesNeedUpdate = true;
  }
}
