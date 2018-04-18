import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Matter of Scale</h1>

    <img className={styles.projectImage} src="assets/images/projects/matterOfScale/01.jpg" />
    <p className={styles.subtext}>Figure b81a93b.</p>

    <img className={styles.projectImage} src="assets/images/projects/matterOfScale/02.jpg" />
    <p className={styles.subtext}>Figure 789060b.</p>

    <img className={styles.projectImage} src="assets/images/projects/matterOfScale/03.jpg" />
    <p className={styles.subtext}>Figure dac17ef.</p>

    <img className={styles.projectImage} src="assets/images/projects/matterOfScale/04.jpg" />
    <p className={styles.subtext}>Figure 2ce1148.</p>

    <img className={styles.projectImage} src="assets/images/projects/matterOfScale/05.jpg" />
    <p className={styles.subtext}>Figure 0ebb472.</p>

    <img className={styles.projectImage} src="assets/images/projects/matterOfScale/06.jpg" />
    <p className={styles.subtext}>Figure 92d1f16.</p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/qMcKJ90m-1s" {...defaultVideoAttributes} />
    </div>
    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/PgOxZ0lgC-0" {...defaultVideoAttributes} />
    </div>
  </article>
);

export default GaTriangles;
