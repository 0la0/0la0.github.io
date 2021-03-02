import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import ShuffleIcon from 'components/icons/shuffle';
import CarretVertical from 'components/icons/carretVertical';
import graphicsManager from 'components/home/modules/graphicsManager';
import styles from './styles.scss';
import ThemeButton from '../icons/themeButton';

const pauseRoutes = ['#/projects', '#/about'];
const history = createBrowserHistory();
const fadeInTime = 1500;

function getStateFromLocation(path) {
  return {
    aboutIsInDom: false,
    aboutIsVisible: false,
    iconsAreVisible: path.length <= 3
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutIsShowing: false,
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
      const shouldPause = pauseRoutes.some(route => location.hash.includes(route));
      shouldPause ? graphicsManager.stopAnimation(): graphicsManager.startAnimation();
      this.setState(getStateFromLocation(location.hash));
    });
    const locationHash = history.location.hash;
    const shouldStart = !pauseRoutes.some(route => locationHash.includes(route));
    this.setState(getStateFromLocation(locationHash));
    if (shouldStart) {
      setTimeout(() => {
        graphicsManager.startAnimation();
        this.setState({ canvasIsVisible: true, });
      }, fadeInTime);
    }
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
    if (event.key === 'Escape') {
      console.log('TODO: close popups');
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

  handleClick = (event) => {
    graphicsManager.onClick(event);
    this.hideAbout();
  };

  onAboutToggle = event => {
    event.preventDefault();
    event.stopPropagation();
    const aboutIsInDom = !this.state.aboutIsInDom;
    aboutIsInDom ? this.showAbout() : this.hideAbout();
  };

  renderIcons() {
    return (
      <div>
        <ShuffleIcon
          title="Shuffle Animation"
          handleClick={graphicsManager.shuffleAnimations.bind(graphicsManager)}
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

  render() {
    return (
      <div
        onClick={this.handleClick}
        className={this.props.className}>
        <canvas
          ref={ele => this.canvasElement = ele}
          className={`${styles.canvas} ${this.state.canvasIsVisible ? styles.canvasActive : ''}`}
        />
        { this.state.iconsAreVisible ? this.renderIcons() : null }
        { this.state.aboutIsInDom ?
          <div className={`${styles.about} ${this.state.aboutIsVisible ? styles.aboutActive : ''}`}>
            <div className={styles.aboutContent}>
              { graphicsManager.getAboutAnimationText() }
            </div>
          </div> : null
        }
      </div>
    );
  }
}

export default Home;
