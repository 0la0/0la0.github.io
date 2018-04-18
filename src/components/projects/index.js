import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import pageActivation from 'components/higherOrderComponents/pageActivation';
import ProjectList from 'components/projects/modules/projectList';
import projectRoutes from 'components/projects/modules/projectRouter';
import styles from './styles.scss';

const Projects = props => {
  const styleString = `${styles.container} ${props.isActive ? styles.containerActive : ''}`;
  return (
    <div className={styleString}>
      <div className={styles.contentContainer}>
        <Switch>
          { projectRoutes.map(projectRoute =>
              <Route
                key={JSON.stringify(projectRoute)}
                path={projectRoute.path}
                component={projectRoute.component}
              />)
          }
          <Route component={ProjectList} />
        </Switch>
      </div>
    </div>
  );
};

export default pageActivation(Projects);
