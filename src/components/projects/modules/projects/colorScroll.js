import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const Component = () => (
  <article>

    <h1>Color Scroll</h1>
    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/NGVMkde0SwE" {...defaultVideoAttributes}/>
    </div>
    <p className={styles.description}>
      Scroll a web page by displaying different colors to a web cam!
    </p>
  </article>
);

export default Component;
