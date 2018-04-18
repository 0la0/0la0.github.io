import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Image Waterfall</h1>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/Yegk7gGdpjQ" {...defaultVideoAttributes} />
    </div>

    <p className={styles.description}>
      A simple program that samples an image and creates a waterfall effect.
    </p>

  </article>
);

export default GaTriangles;
