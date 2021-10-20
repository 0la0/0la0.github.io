import React, { Component } from 'react';
import { withRouter, } from 'react-router';
import { createBrowserHistory } from 'history';
// import ShuffleIcon from '../icons/shuffle';
// import CarretVertical from '../icons/carretVertical';
import AboutAnimation from './AboutAnimation';
import graphicsManager from '../home/modules/graphicsManager';
import styles from './styles.scss';
// import ThemeButton from '../icons/themeButton';
import themeHOC from '../modules/themeHOC';

const pauseRoutes = [ '#/projects', '#/about', ];
const history = createBrowserHistory();
const fadeInTime = 1500;
const isInPauseRoute = locationHash => pauseRoutes.some(route => locationHash.includes(route));
const getStateForLocationHash = locationHash => ({
  aboutIsInDom: false,
  aboutIsVisible: false,
  iconsAreVisible: locationHash.length <= 3,
  menuIsVisible: !isInPauseRoute(location.hash),
  controlsAreVisible: !isInPauseRoute(location.hash),
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutIsInDom: false,
      aboutIsVisible: false,
      iconsAreVisible: true,
      canvasIsVisible: false,
      menuIsVisible: true,
      animationIsRunning: true,
    };
    this.resizeIsQueued = false;
  }

  componentDidMount() {
    graphicsManager.init(this.canvasElement);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyPress);
    this.remoteRouteChangeListener = history.listen((location, action) => {
      const shouldPause = isInPauseRoute(location.hash);
      shouldPause ? graphicsManager.stopAnimation(): graphicsManager.startAnimation();
      this.setState(getStateForLocationHash(location.hash));
    });
    const locationHash = history.location.hash;
    this.setState(getStateForLocationHash(locationHash));
    setTimeout(() => {
      this.setState({ canvasIsVisible: true, });
      if (!isInPauseRoute(locationHash)) {
        graphicsManager.startAnimation();
      }
    }, fadeInTime);
  }

  componentWillUnmount() {
    graphicsManager.stopAnimation();
    window.removeEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyPress);
    this.remoteRouteChangeListener();
  }

  handleResize = () => {
    if (this.resizeIsQueued) {
      return;
    }
    this.resizeIsQueued = true;
    setTimeout(() => {
      this.resizeIsQueued = false;
      graphicsManager.onResize()
    }, 100);
  };

  handleKeyPress = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    if (this.state.aboutIsInDom) {
      this.hideAbout();
      return;
    }
    if (isInPauseRoute(window.location.hash)) {
      this.props.history.replace('/');
    }
  };

  showAbout = () => {
    this.setState({ aboutIsInDom: true });
    setTimeout(() => this.setState({ aboutIsVisible: true }));
  };

  hideAbout = () => {
    this.setState({ aboutIsVisible: false, });
    setTimeout(() => this.setState({ aboutIsInDom: false }), 250);
  };

  handleOutsideAboutClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.hideAbout();
  };

  handleCanvasClick = (event) => {
    if (isInPauseRoute(window.location.hash) || this.state.aboutIsInDom) {
      return;
    }
    graphicsManager.onClick(event);
  };

  handleCanvasMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  onAboutToggle = event => {
    event.preventDefault();
    event.stopPropagation();
    this.state.aboutIsInDom ? this.hideAbout() : this.showAbout();
  };

  handleShuffleClick = () => {
    this.hideAbout();
    graphicsManager.shuffleAnimations();
    if (!this.state.animationIsRunning) {
      graphicsManager.startAnimation();
      setTimeout(() => graphicsManager.stopAnimation(), 250);
    }
  };

  toggleAnimation = () => {
    this.setState(state => {
      const animationIsRunning = !state.animationIsRunning;
      animationIsRunning ?  graphicsManager.startAnimation() : graphicsManager.stopAnimation();
      return { animationIsRunning, };
    });
  };

  toggleTheme = () => {
    this.props.toggleTheme();
    if (!this.state.animationIsRunning) {
      graphicsManager.startAnimation();
      setTimeout(() => graphicsManager.stopAnimation(), 33);
    }
  };

  render() {
    return (
      <div className={this.props.className}>
        <canvas
          ref={ele => this.canvasElement = ele}
          className={`${styles.canvas} ${this.state.canvasIsVisible ? styles.canvasActive : ''}`}
          onClick={this.handleCanvasClick}
          onMouseDown={this.handleCanvasMouseDown}
        />
        {
          this.state.menuIsVisible ?
            (
              <menu className={`${styles.menu} ${this.props.themeIsLight ? styles.menuLightMode : ''}`}>
                <li>
                  <h1 className={styles.title}>
                    <a
                      className={styles.titleLink}
                      href="/#/about"
                    >
                      Luke Anderson
                    </a>
                  </h1>
                </li>
                <li>
                  <a
                    className={styles.menuLink}
                    href="/#/projects"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <button
                    onClick={this.onAboutToggle}
                    className={styles.controlButton}
                  >
                    About Animation
                  </button>
                </li>
                <li>
                  <button
                    onClick={this.handleShuffleClick}
                    className={styles.controlButton}
                  >
                    Shuffle
                  </button>
                </li>
                
                <li>
                  <button
                    onClick={this.toggleTheme}
                    className={styles.controlButton}
                  >
                    { this.props.themeIsLight ? 'Dark Mode' : 'Light Mode' }
                  </button>
                </li>
                <li>
                  <button
                    onClick={this.toggleAnimation}
                    className={styles.controlButton}
                  >
                    { this.state.animationIsRunning ? 'Stop Animations' : 'Start Animations'}
                  </button>
                </li>
              </menu>
            ) : null
        }
        { this.state.aboutIsInDom ? (
          <AboutAnimation
            isVisible={this.state.aboutIsVisible}
            content={graphicsManager.getAboutAnimationText()}
            handleOutsideClick={this.handleOutsideAboutClick}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(themeHOC(Home));
