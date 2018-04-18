import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Particle Swarm Optimization Visualization</h1>

    <p className={styles.textBlock}>
      A java program that visualizes the particle swarm optimization algorithm in
      continuous space.  Particles are represented as either pixels or cubes,
      and their parameters are mapped to visual properties such as position,
      color, and rotation.
    </p>

    <p className={styles.textBlock}>
      <span>
        Source:
      </span>
      <span>
        <a href="https://github.com/0la0/psoViz">github.com/0la0/psoViz</a>
      </span>
    </p>

    <img className={styles.projectImage} src="assets/images/projects/psoViz/04.png" />
    <p className={styles.subtextDescription}>Figure e84433e.</p>
    <p className={styles.textBlockCaption}>
      A composite image from the program.  The search space has nine dimensions:
      position (x, y, z), rotation (alpha, beta, gamma), and color (r, g, b).
      Each particle is represented as a cube with each of those properties.
    </p>

    <img className={styles.projectImage} src="assets/images/projects/psoViz/02.png" />
    <p className={styles.subtextDescription}>Figure 917b734.</p>
    <p className={styles.textBlockCaption}>
      A composite image from the program.  This search space has five dimensions:
      position (x, y), and color (r, g, b).
    </p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/sHtqO8aBY98" {...defaultVideoAttributes} />
    </div>

    <img className={styles.projectImage} src="assets/images/projects/psoViz/03.png" />
    <p className={styles.subtext}>Figure 2a2e8b8.</p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/nhskge8wPrU" {...defaultVideoAttributes} />
    </div>

    <img className={styles.projectImage} src="assets/images/projects/psoViz/01.png" />
    <p className={styles.subtext}>Figure 51daede.</p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/gkGa6WZpcQg" {...defaultVideoAttributes} />
    </div>

    <img className={styles.projectImage} src="assets/images/projects/psoViz/05.png" />
    <p className={styles.subtextDescription}>Figure 51a0dae.</p>
    <p className={styles.textBlockCaption}>
      A screenshot of the program. On the left side of the user interface are the
      controllers for the algorithm.  There are sliders for algorithm coefficients
      (local best and global best), and speed limit. There are also sliders for
      multiplying the parameters for each particle.  On the right side of the user
      interface is the display area.  The wire box represents the bounds of the
      search space (x, y, z).
    </p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/GIiVo_Jsyxc" {...defaultVideoAttributes} />
    </div>

    <img className={styles.projectImage} src="assets/images/projects/psoViz/06.png" />
    <p className={styles.subtext}>Figure c900b05.</p>

  </article>
);

export default GaTriangles;
