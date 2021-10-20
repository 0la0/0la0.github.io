import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import MenuButton from 'components/icons/menu';
import Back from 'components/icons/back';
import CarretVertical from 'components/icons/carretVertical';
import styles from './navBar.styles.scss';

const history = createBrowserHistory();

const routes = {
  ABOUT: '/about',
  PROJECTS: '/projects',
};

const getStateFromLocation = path => ({
  closeButtonIsVisible: path.includes(routes.PROJECTS) || path.includes(routes.ABOUT),
  aboutIsOpen: path.includes(routes.ABOUT),
  backButtonIsShowing: /\/projects\/(.+)/.test(path)
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeButtonIsVisible: false,
      aboutIsOpen: true,
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

  handleCloseClick = (event) => {
    if (!this.state.closeButtonIsVisible) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.props.history.push('/');
  };

  handleAboutClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const path = this.state.aboutIsOpen ? '' : routes.ABOUT;
    this.props.history.push(path);
  };

  handleProjectBackClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.history.length < 3) {
      this.props.history.push(routes.PROJECTS);
    }
    else {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <div className={`${this.props.className} ${styles.container}`}>
        {
          this.state.closeButtonIsVisible ? (
            <MenuButton
              isActive={this.state.closeButtonIsVisible}
              handleClick={this.handleCloseClick}
              title="Projects"
              className={styles.closeButton}
            />
          ) : null
        }
        <Back
          isActive={this.state.backButtonIsShowing}
          handleClick={this.handleProjectBackClick}
          className={styles.backButton}
        />
        {/* <CarretVertical
          isActive={!this.state.aboutIsClosed}
          handleClick={this.handleAboutClick}
          title="About"
          className={styles.aboutButton} /> */}
      </div>
    );
  }
}

NavBar.propTypes = {};

export default withRouter(NavBar);
