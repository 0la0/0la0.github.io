import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import pageActivation from 'components/higherOrderComponents/pageActivation';
import ProjectList from 'components/projects/modules/projectList';
import projectRoutes from 'components/projects/modules/projectRouter';
import styles from './styles.scss';

const history = createHistory();

class Projects extends Component {
  componentDidMount() {
    this.remoteRouteChangeListener = history.listen((location, action) => {
      this.scrollElement.scrollTop = 0;
    });
  }

  componentWillUnmount() {
    this.remoteRouteChangeListener();
  }

  render() {
    const styleString = `${styles.container} ${this.props.isActive ? styles.containerActive : ''}`;
    return (
      <div
        ref={ele => this.scrollElement = ele}
        className={styleString}>
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
  }
}

export default pageActivation(Projects);
