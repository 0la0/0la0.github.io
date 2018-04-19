import React, { Component } from 'react';
import { Vector2 } from 'three';
import styles from './styles.scss';

const SVG = {
  MIN: 30,
  MID: 50,
  MAX: 70,
};

const ANIMATION_LENGTH_MS = 120;

class Point {
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

class MovablePoint extends Point {
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

class Line {
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

class ShuffleIcon extends Component {
  constructor(props) {
    super(props);
    this.isAnimating = false;
    this.line1 = new Line(true);
    this.line2 = new Line(false);
    this.startTime = performance.now();
    this.state = {
      lineOneString: this.line1.toString(),
      lineTwoString: this.line2.toString(),
      circleOne: this.line1.getEndPoint(),
      circleTwo: this.line2.getEndPoint()
    };

  }

  animate() {
    const totalTime = performance.now() - this.startTime;
    const percentTime = totalTime / ANIMATION_LENGTH_MS * 2;
    const percentTime2 = (totalTime / ANIMATION_LENGTH_MS) - 0.7;

    if (percentTime <= 1) {
      this.line1.animate(percentTime);
    } else {
      this.line1.finishTransform();
    }
    if (percentTime2 >= 0 && percentTime2 <= 1) {
      this.line2.animate(percentTime2);
    } else if (percentTime2 > 1) {
      this.line2.finishTransform();
      this.isAnimating = false;
    }

    this.setState({
      lineOneString: this.line1.toString(),
      lineTwoString: this.line2.toString(),
      circleOne: this.line1.getEndPoint(),
      circleTwo: this.line2.getEndPoint()
    });
    if (this.isAnimating) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  onClick = () => {
    if (this.isAnimating) { return; }
    this.isAnimating = true;
    this.startTime = performance.now();
    this.line1.toggleState();
    this.line2.toggleState();
    this.animate();
    this.props.handleClick();
  };

  render() {
    return (
      <div
        onClick={this.onClick}
        title={this.props.title}
        className={this.props.className}>
        <svg
          className={styles.svg}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path d={this.state.lineOneString} strokeWidth="3" stroke="#abb2bf" strokeLinecap="round" fill="transparent" />
          <circle {...this.state.circleOne} r="6" stroke="#abb2bf" fill="#abb2bf" />
          <path d={this.state.lineTwoString} stroke="#282c34" strokeWidth="14" strokeLinecap="round" fill="transparent" />
          <path d={this.state.lineTwoString} strokeWidth="3" stroke="#EEE" strokeLinecap="round" fill="transparent" />
          <circle {...this.state.circleTwo} r="6" strokeWidth="2" stroke="#EEE" fill="#282c34" />
        </svg>
      </div>
    );
  }
}

export default ShuffleIcon;
