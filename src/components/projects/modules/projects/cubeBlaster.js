import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const Component = () => (
  <article>

    <h1>Cube Blaster</h1>

    <p className={styles.description}>
      An FPS style game with the objective of blasting “objects” into “planes.”
    </p>

    <p className={styles.description}>
      Made with C# and OpenGL (OpenTK Framework).  Game engine made from following
      the instructions of the book: “C# Game Programming For Serious Game Creation.”
    </p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/01.jpg" />
    <p className={styles.subtext}>Figure 83db6d4.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/02.jpg" />
    <p className={styles.subtext}>Figure 8db00eb.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/03.jpg" />
    <p className={styles.subtext}>Figure 219eed4.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/04.jpg" />
    <p className={styles.subtext}>Figure d1f16ca.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/05.jpg" />
    <p className={styles.subtext}>Figure 2ef48f5.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/06.jpg" />
    <p className={styles.subtext}>Figure 8155120.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/07.jpg" />
    <p className={styles.subtext}>Figure 209601a.</p>

    <img className={styles.projectImage} src="assets/images/projects/cubeBlaster/08.jpg" />
    <p className={styles.subtext}>Figure 891e4a1.</p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/XzbHdBRdwak" {...defaultVideoAttributes} />
    </div>

  </article>
);

export default Component;
