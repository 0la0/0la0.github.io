import React from 'react';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Pixels go on a random walk</h1>

    <img className={styles.projectImage} src="assets/images/projects/pixelWalk/01.jpg" />
    <p className={styles.subtext}>Figure cc8da73.</p>

    <img className={styles.projectImage} src="assets/images/projects/pixelWalk/02.jpg" />
    <p className={styles.subtext}>Figure 73057b2.</p>

    <img className={styles.projectImage} src="assets/images/projects/pixelWalk/03.jpg" />
    <p className={styles.subtext}>Figure 275c20a.</p>

    <img className={styles.projectImage} src="assets/images/projects/pixelWalk/04.jpg" />
    <p className={styles.subtext}>Figure da083d9.</p>

    <img className={styles.projectImage} src="assets/images/projects/pixelWalk/05.jpg" />
    <p className={styles.subtext}>Figure 6d8c250.</p>

  </article>
);

export default GaTriangles;
