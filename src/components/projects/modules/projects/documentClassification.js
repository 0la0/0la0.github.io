import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const Component = () => (
  <article>

    <h1>Document Classification with Naive Bayes on User Generated Content</h1>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/tgvmcl0SbMU" {...defaultVideoAttributes} />
    </div>

    <p className={styles.description}>
      Naive Bayes supervised learning using the YAHOO! Answers research dataset
      (3.1 million documents in 26 different categories from the YAHOO Q&amp;A site).
    </p>

    <p className={styles.description}>
      The resulting application is a Java back-end and a browser based front-end.
      The Java process uses a learner model created in the WEKA machine learning
      framework.  The front-end sends a string to the process over a simple web
      API and receives a predicted classification as a response.
    </p>

  </article>
);

export default Component;
