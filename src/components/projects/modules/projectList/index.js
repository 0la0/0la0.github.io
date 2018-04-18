import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import projectRoutes from 'components/projects/modules/projectRouter';
import styles from './styles.scss';

const ProjectList = () => (
  <div>
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>Projects</h1>
      <p className={styles.headerSubTitle}>
        A sample of personal projects.
      </p>
    </div>
    <div className={styles.container}>
      {
        projectRoutes.map(project =>
          <Link
            key={JSON.stringify(project)}
            to={project.path}
            className={styles.projectThumbnail}
            style={{backgroundImage: `url(${project.thumbnail})`}}
          >
            <p className={styles.projectLabel}>
              {project.label}
            </p>
            <p className={styles.projectDescription}>
              {project.description}
            </p>
          </Link>
        )
      }
    </div>
  </div>
);

export default ProjectList;
