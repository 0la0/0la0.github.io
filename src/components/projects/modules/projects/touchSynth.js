import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>
    <h1>Touch Synth</h1>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/0_0PVpZ10XI" {...defaultVideoAttributes} />
    </div>

    <p className={styles.description}>
      Triggering a synth from a web app.
    </p>
    <p className={styles.description}>
      Hardware: Simmons SDS 8 Analog Drum Machine, Teensy 2.0 USB Development Board
    </p>
    <p className={styles.description}>
      Software: Web App, Node Server
    </p>
  </article>
);

export default GaTriangles;
