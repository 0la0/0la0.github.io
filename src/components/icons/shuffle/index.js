import React, { Component } from 'react';
// import Point from './Point';
// import MovablePoint from './MoveablePoint';
import Line from './Line';
import themeHoc from '../../modules/themeHOC';
import styles from './styles.scss';



const ANIMATION_LENGTH_MS = 120;



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
    const isLight = this.props.themeIsLight;
    return (
      <button
        onClick={this.onClick}
        title={this.props.title}
        className={this.props.className}
        type="button"
      >
        <svg
          className={styles.svg}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path d={this.state.lineOneString} className={`${styles.backgroundLine} ${isLight ? styles.backgroundLineLight : ''}`} />
          <circle {...this.state.circleOne} r="6" className={`${styles.backgroundCircle} ${isLight ? styles.backgroundCircleLight : ''}`} />
          <path d={this.state.lineTwoString} className={`${styles.foregroundOutline} ${isLight ? styles.foregroundOutlineLight : ''}`} />
          <path d={this.state.lineTwoString} className={`${styles.foregroundLineHighlight} ${isLight ? styles.foregroundLineHighlightLight : ''}`} />
          <circle {...this.state.circleTwo} r="6" className={`${styles.foregroundCicle} ${isLight ? styles.foregroundCicleLight : ''}`} />
        </svg>
      </button>
    );
  }
}

export default themeHoc(ShuffleIcon);
