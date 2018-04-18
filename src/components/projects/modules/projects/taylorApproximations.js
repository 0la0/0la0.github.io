import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Taylor approximations of a sinusoid</h1>

    <p className={styles.description}>
      These images are layered taylor approximations of a sine wave. The image is
      a composite of approximations based at iterated points through the domain.
    </p>

    <img className={styles.projectImage} src="assets/images/projects/taylorApproximations/01.jpg" />
    <p className={styles.subtext}>Taylor Approximation Degree 1.</p>

    <img className={styles.projectImage} src="assets/images/projects/taylorApproximations/02.jpg" />
    <p className={styles.subtext}>Taylor Approximation Degree 2.</p>

    <img className={styles.projectImage} src="assets/images/projects/taylorApproximations/03.jpg" />
    <p className={styles.subtext}>Taylor Approximation Degree 3.</p>

    <img className={styles.projectImage} src="assets/images/projects/taylorApproximations/04.jpg" />
    <p className={styles.subtext}>Taylor Approximation Degree 4.</p>

    <img className={styles.projectImage} src="assets/images/projects/taylorApproximations/05.jpg" />
    <p className={styles.subtext}>Taylor Approximation Degree 5.</p>

    <img className={styles.projectImage} src="assets/images/projects/taylorApproximations/06.jpg" />
    <p className={styles.subtext}>Taylor Approximation Degree 6.</p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/H5VSbovlpPw" {...defaultVideoAttributes} />
    </div>
    <p className={styles.subtext}>Animation with a moving point.</p>

  </article>
);

export default GaTriangles;
