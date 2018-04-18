import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const Component = () => (
  <article>

    <h1>Browser Sampler</h1>
    <p className={styles.textBlock}>
      A web application for creating experimental electronic music. The app features
      sequencers, samplers, synths, effects, and MIDI capabilities. It is created
      with the Polymer framework and utilizes the Web Audio API and the Web MIDI API.
      While many languages, frameworks, and applications exist with this same
      functionality; this application is intended to be a bottom-up personal
      exploration of audio processing concepts. Many of the design decisions are
      heavily influenced by other popular audio software like PD and Ableton.
    </p>
    <p className={styles.textBlock}>
      <span>
        Source:
      </span>
      <span> </span>
      <span>
        <a href="https://github.com/0la0/polysound">github.com/0la0/polysound</a>
      </span>
    </p>
    <img className={styles.projectImage} src="assets/images/projects/browserSampler/sampler1.png" />
    <p className={styles.textBlock}>
      The application has gone through a number of iterations. The first iteration
      featured a UI created with my deprecated touchLib.js library.  It had five
      sampler channels, a granular synth, two effect channels, and communicated
      with midi devices over web sockets. A video of the first iteration follows.
    </p>
    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/hkJCyQDONwU" {...defaultVideoAttributes} />
    </div>
  </article>
);

export default Component;
