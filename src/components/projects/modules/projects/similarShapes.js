import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Similar Shapes</h1>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/OO0d8mmnOHM" {...defaultVideoAttributes} />
    </div>

    <p className={styles.description}>
      A program that takes a user created gesture as an input, inserts the gesture
      into a database, then returns a similar shape from the database.
      The query is a least squares analysis on the series of vectors.
    </p>
    <p className={styles.description}>
      NodeJS server, Mongo database, JavaScript front-end.
    </p>

  </article>
);

export default GaTriangles;
