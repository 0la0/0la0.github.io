import React, { Component } from 'react';
import pageActivation from 'components/higherOrderComponents/pageActivation';
import styles from './styles.scss';

const About = props => {
  const styleString = `${styles.container} ${props.isActive ? styles.containerActive : ''}`;
  return (
    <div className={styleString}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Luke Anderson</h1>
          <sub className={styles.headerSubTitle}>Interaction Developer</sub>
        </div>
        <p className={styles.aboutText}>Hello from Kansas City!</p>
        <p className={styles.aboutText}>
          I am a software developer who enjoys creating novel interactive experiences.
          My interests include: real-time interaction, graphics programming, audio programming, and the application of machine-learning on user interaction.
        </p>
        <p className={styles.aboutText}>
          I am from Kansas. I studied visual art at the University of Kansas, and Computer Science at Washburn University.
        </p>
        <p className={styles.aboutText}>For more information, there are external links:</p>
        <a href="https://github.com/0la0">Github</a>
        <br />
        <a href="https://www.linkedin.com/in/luke-anderson-348400ab">LinkedIn</a>
      </div>
    </div>
  );
};

export default pageActivation(About);
