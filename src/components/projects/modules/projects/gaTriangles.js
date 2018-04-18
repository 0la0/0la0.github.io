import React from 'react';
import styles from './styles.scss';

const Component = () => (
  <article>

    <h1>Goals in Flux: Interpreting Evolutionary Maps</h1>

    <p className={styles.textBlock}>
      An art project that derives images from genetic algorithms.
      Individuals are represented as triangles and populations are represented as
      columns of triangles. The image can be read from left to right, where
      populations evolve over successive iterations.
    </p>

    <p className={styles.textBlock}>
      <span>
        Source:
      </span>
      <span>
        <a href="https://github.com/0la0/gaTriangles">github.com/0la0/gaTriangles</a>
      </span>
    </p>

    <img className={styles.projectImage} src="assets/images/projects/gaTriangles/01.png" />
    <p className={styles.subtextDescription}>Figure 6ae0f29.</p>
    <p className={styles.textBlock}>
      The algorithm that drives the procedure follows:
      <br /><br />
      Let <span className={styles.italic}>f</span> be a fitness function defined as Euclidean distance between an individual and a goal state.
      <br />
      Let <span className={styles.italic}>ub</span> be an upper bound for <span className={styles.italic}>f</span>.
      <br />
      Let <span className={styles.italic}>lb</span> a lower bound for <span className={styles.italic}>f</span>.
      <br />
      For a predetermined number of iterations, do:
      <ul className={styles.textBlock}>
        <li>
          Step 1: Generate an arbitrary goal state <span className={styles.italic}>s</span>
          and an arbitrary genome index <span className={styles.italic}>i</span>.
        </li>
        <li>
          Step 2: While <span className={styles.italic}>f(genome<sub className={styles.italic}>i</sub>)</span> is greater than <span className={styles.italic}>lb</span>,
          iterate the algorithm.
        </li>
        <li>
          Step 3: While <span className={styles.italic}>f(genome<sub className={styles.italic}>i</sub>)</span> is less than <span className={styles.italic}>ub</span>,
          increase the mutation level and iterate the algorithm.
        </li>
        <li>
          Step 4: Go to step 1.
        </li>
      </ul>
    </p>

    <img className={styles.projectImage} src="assets/images/projects/gaTriangles/02.png" />
    <p className={styles.subtext}>Figure 84d939b.</p>

    <img className={styles.projectImage} src="assets/images/projects/gaTriangles/03.png" />
    <p className={styles.subtext}>Figure fabe311.</p>

    <img className={styles.projectImage} src="assets/images/projects/gaTriangles/04.png" />
    <p className={styles.subtext}>Figure ce34201.</p>

    <img className={styles.projectImage} src="assets/images/projects/gaTriangles/05.png" />
    <p className={styles.subtext}>Figure 38d1f64.</p>

  </article>
);

export default Component;
