import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';
import { withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import MenuButton from 'components/icons/menu';
import Back from 'components/icons/back';
import CarretVertical from 'components/icons/carretVertical';
import styles from './styles.scss';

const history = createHistory();

function getStateFromLocation(path) {
  return {
    menuIsOpen: path.indexOf('/projects') > -1,
    aboutIsClosed: path.indexOf('/about') < 0,
    backButtonIsShowing: /\/projects\/(.+)/.test(path)
  };
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
      aboutIsClosed: true,
      backButtonIsShowing: false
    };
  }

  componentDidMount() {
    this.remoteRouteChangeListener = history.listen((location, action) => {
      this.setState(getStateFromLocation(location.hash));
    });
    this.setState(getStateFromLocation(this.props.location.pathname));
  }

  componentWillUnmount() {
    this.remoteRouteChangeListener();
  }

  handleMenuClick = () => {
    const path = this.state.menuIsOpen ? '/' : '/projects';
    this.props.history.push(path);
  };

  handleAboutClick = () => {
    const path = this.state.aboutIsClosed ? '/about' : '/';
    this.props.history.push(path);
  };

  handleProjectBackClick = () => {
    if (this.props.history.length < 3) {
      this.props.history.push('/projects');
    }
    else {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <div className={`${this.props.className} ${styles.container}`}>
        <MenuButton
          isActive={this.state.menuIsOpen}
          handleClick={this.handleMenuClick}
          title="Projects"
          className={styles.menuButton}
        />
        <Back
          isActive={this.state.backButtonIsShowing}
          handleClick={this.handleProjectBackClick}
          className={styles.backButton} />
        <CarretVertical
          isActive={this.state.aboutIsClosed}
          handleClick={this.handleAboutClick}
          title="About"
          className={styles.aboutButton} />
      </div>
    );
  }
}

Menu.propTypes = {};

export default withRouter(Menu);
