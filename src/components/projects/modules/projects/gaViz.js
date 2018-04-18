import React from 'react';
import defaultVideoAttributes from 'components/projects/modules/videoAttributes';
import styles from './styles.scss';

const GaTriangles = () => (
  <article>

    <h1>Genetic Algorithm Visualization</h1>

    <p className={styles.textBlock}>
      A java program that visualizes genetic algorithms in continuous space.
      Individuals are represented as either pixels or cubes, and their genome is mapped
      to visual parameters such as position, color, scale, etc.
    </p>

    <p className={styles.textBlock}>
      <span>
        Source:
      </span>
      <span>
        <a href="https://github.com/0la0/simpleGAvis">github.com/0la0/simpleGAvis</a>
      </span>
    </p>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_03.png" />
    <p className={styles.subtextDescription}>Figure 6e46e98.</p>
    <p className={styles.textBlockCaption}>
      In this image and the following video, the goal state has five properties: position (x and y),
      and color (r, g, b).  Thus, individuals have five genes in their genome that
      are mapped to each of these parameters.
    </p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/BByDM9h8Th8" {...defaultVideoAttributes} />
    </div>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_04.png" />
    <p className={styles.subtextDescription}>Figure 3ba53c4.</p>
    <p className={styles.textBlockCaption}>
      Similar to the example above, the goal state in this image has the properties:
      position (x, y, z), color (r, g, b), and scale (x, y, z).  This implies that
      individuals have nine genes.
    </p>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_05.png" />
    <p className={styles.subtext}>Figure 75670a4.</p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/Zg0QICmGt6U" {...defaultVideoAttributes} />
    </div>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_06.png" />
    <p className={styles.subtext}>Figure 42a2462.</p>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_07.png" />
    <p className={styles.subtext}>Figure 84325d6.</p>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_01.png" />
    <p className={styles.subtextDescription}>Figure f7585ad.</p>
    <p className={styles.textBlockCaption}>
      Here, individual have three genes mapped to color (r, g, b).
      A population is represented by a horizontal row, where the top row is a randomly
      generated set of individuals and the goal state is a greenish color.
    </p>

    <img className={styles.projectImage} src="assets/images/projects/gaViz/gaViz_02.png" />
    <p className={styles.subtextDescription}>Figure 290d89c.</p>
    <p className={styles.textBlockCaption}>
      A still from an animation where individuals are represented by a one pixel column.
      Each frame of the animation is represented by one generation, where individuals
      are sorted by color.
    </p>

    <div className={styles.videoContainer}>
      <iframe src="https://www.youtube.com/embed/lVgz8J1aIVw" {...defaultVideoAttributes} />
    </div>

  </article>
);

export default GaTriangles;
