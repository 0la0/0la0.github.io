import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Predictive Shape Classification</h1>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/8yEg8NpekMA" {...defaultVideoAttributes} />
    </div>

    <p className={styles.description}>
      The C4.5 algorithm is used on a set of approximately 100 classified shapes.
      This application uses the resulting decision tree to predict the
      classification of shapes that the user draws with a mouse or finger.
    </p>

  </article>
);

export default GaTriangles;
