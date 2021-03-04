import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../home';
import Menu from '../menu';
import Projects from '../projects';
import About from '../about';
import themeStore from '../modules/ThemeStore';
import styles from './styles.scss';
import baseStyles from './baseStyles.scss';

const appShellClasses = `${styles.container} ${themeStore.isLight() ? styles.containerLight : ''}`;

const App = () => (
  <Router className={appShellClasses}>
    <Home className={styles.home} />
    <Menu className={styles.menu} />
    <Switch>
      <Route path='/projects' component={Projects}/>
      <Route path='/about' component={About}/>
    </Switch>
  </Router>
);

export default App;
