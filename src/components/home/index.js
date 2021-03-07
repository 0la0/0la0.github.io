import React, { Component } from 'react';
import { withRouter, } from 'react-router';
import { createBrowserHistory } from 'history';
import ShuffleIcon from '../icons/shuffle';
import CarretVertical from '../icons/carretVertical';
import AboutAnimation from './AboutAnimation';
import graphicsManager from '../home/modules/graphicsManager';
import styles from './styles.scss';
import ThemeButton from '../icons/themeButton';

const pauseRoutes = [ '#/projects', '#/about', ];
const history = createBrowserHistory();
const fadeInTime = 1500;
const isInPauseRoute = locationHash => pauseRoutes.some(route => locationHash.includes(route));
const getStateForLocationHash = locationHash => ({
  aboutIsInDom: false,
  aboutIsVisible: false,
  iconsAreVisible: locationHash.length <= 3,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutIsInDom: false,
      aboutIsVisible: false,
      iconsAreVisible: true,
      canvasIsVisible: false,
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

  onAboutToggle = event => {
    event.preventDefault();
    event.stopPropagation();
    this.state.aboutIsInDom ? this.hideAbout() : this.showAbout();
  };

  handleShuffleClick = () => {
    this.hideAbout();
    graphicsManager.shuffleAnimations();
  };

  renderIcons() {
    if (!this.state.iconsAreVisible) {
      return null;
    }
    return (
      <div>
        <ShuffleIcon
          title="Shuffle Animation"
          handleClick={this.handleShuffleClick}
          className={styles.shuffleButton} />
        <ThemeButton
          title="Theme"
          className={styles.themeButton}
        />
        <CarretVertical
          isActive={this.state.aboutIsVisible}
          handleClick={this.onAboutToggle}
          title="About Animation"
          className={styles.aboutButton} />
      </div>
    );
  }

  renderAboutAnimation() {
    if (!this.state.aboutIsInDom) {
      return null;
    }
    return (
      <AboutAnimation
        isVisible={this.state.aboutIsVisible}
        content={graphicsManager.getAboutAnimationText()}
        handleOutsideClick={this.handleOutsideAboutClick}
      />
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        <canvas
          ref={ele => this.canvasElement = ele}
          className={`${styles.canvas} ${this.state.canvasIsVisible ? styles.canvasActive : ''}`}
          onClick={this.handleCanvasClick}
        />
        {this.renderIcons()}
        {this.renderAboutAnimation()}
      </div>
    );
  }
}

export default withRouter(Home);
