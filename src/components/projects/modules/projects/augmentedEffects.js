import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const Component = () => (
  <article>

    <h1>Augmented Effects</h1>
    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/Kn2EdlEbWpY" {...defaultVideoAttributes}/>
    </div>
    <p className={styles.description}>
      Real-time video effects in the browsers.
    </p>
  </article>
);

export default Component;
