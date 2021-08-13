import React from 'react';
import { withRouter } from 'react-router';
import pageActivation from '../modules/pageActivationHOC';
import outsideClickHandler from '../modules/outsideClickHandler';
import styles from './styles.scss';

const About = props => {
  const componentRef = outsideClickHandler(event => props.history.replace('/'));
  return (
    <div
      ref={componentRef}
      className={`${styles.container} ${props.isActive ? styles.containerActive : ''}`}
    >
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Luke Anderson</h1>
          <sub className={styles.headerSubTitle}>Interaction Developer</sub>
        </div>
        <p className={styles.aboutText}>Hello from Kansas City!</p>
        <p className={styles.aboutText}>
          I am a software developer who enjoys creating novel interactive experiences.
          My interests include: real-time interaction, graphics programming, audio programming, and content creation tools.
        </p>
        <p className={styles.aboutText}>For more information:</p>
        <a href="https://github.com/0la0">Github</a>
        <br />
        <a href="https://www.linkedin.com/in/luke-anderson-348400ab">LinkedIn</a>
      </div>
    </div>
  );
};

export default withRouter(pageActivation(About));
