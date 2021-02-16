import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from 'components/home';
import Menu from 'components/menu';
import Projects from 'components/projects';
import About from 'components/about';

import styles from './styles.scss';
import baseStyles from './baseStyles.scss';

const App = () => (
  <div className={styles.container} >
    <Home className={styles.home} />
    <Router>
      <div>
        <Menu className={styles.menu} />
        <Switch>
          <Route path='/projects' component={Projects}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
