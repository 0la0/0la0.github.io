import React from 'react';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>TouchLibJS: a JavaScript UI library for real-time interatction</h1>

    <p className={styles.textBlock}>
      TouchLib grew out of a need to consolidate my UI modules into one place.
      The library features a range of sliders and buttons, each optimized for
      real-time interaction. While there are many existing libraries and
      frameworks that provide this same functionality, the aim of TouchLibJS was
      to assist in the creation of browser based interactive art.
    </p>

    <p className={styles.textBlock}>
      <span>
        Source:
      </span>
      <span>
        <a href="https://github.com/0la0/TouchLibJS">github.com/0la0/TouchLibJS</a>
      </span>
    </p>

    <div>
      <img className={styles.projectImage} src="assets/images/projects/touchLib/matterOfScale01.png" />
      <p className={styles.subtext}>Matter of Scale</p>
    </div>

    <p className={styles.textBlock}>
      Screenshots from
      <a data-route="matterOfScale" href="projects/matterOfScale">Matter of Scale</a>, an interactive
      installation in an art museum. Using the interface above, users could create
      projected patterns. The interface below alowed users to create visual
      patterns derived from images in the museum collection.
    </p>

    <div>
      <img className={styles.projectImage} src="assets/images/projects/touchLib/matterOfScale02.png" />
      <p className={styles.subtext}>Matter of Scale</p>
    </div>

    <div>
      <img className={styles.projectImage} src="assets/images/projects/touchLib/sequencer.jpg" />
      <p className={styles.subtext}>Ableton Sequencer</p>
    </div>

    <p className={styles.textBlock}>
      A sequencer application that interfaced with Ableton Live. The app sent midi
      data to a <a href="https://github.com/0la0/jWsMidi">Java server</a>, which
      relayed the signal to Ableton Live.
    </p>

    <div>
      <img className={styles.projectImage} src="assets/images/projects/touchLib/bounceTrigger.png" />
      <p className={styles.subtext}>Bounce Trigger</p>
    </div>

    <p className={styles.textBlock}>
      A physical simulation of bouncing balls. The balls hitting the ground
      triggered events (networked, visual, auditory, etc).
    </p>

  </article>
);

export default GaTriangles;
