import React, { Component } from 'react';
import { withRouter } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import ShuffleIcon from 'components/icons/shuffle';
import CarretVertical from 'components/icons/carretVertical';
import graphicsManager from 'components/home/modules/graphicsManager';
import styles from './styles.scss';

const pauseRoutes = ['#/projects', '#/about'];
const history = createHistory();

function getStateFromLocation(path) {
  return {
    aboutIsShowing: false,
    iconsAreVisible: path.length <= 3
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutIsShowing: false,
      iconsAreVisible: true
    };
  }

  componentDidMount() {
    graphicsManager.init(this.canvasElement);
    window.addEventListener('resize', this.onResize);
    this.remoteRouteChangeListener = history.listen((location, action) => {
      const shouldPause = pauseRoutes.some(route => location.hash.indexOf(route) > -1);
      shouldPause ? graphicsManager.stopAnimation(): graphicsManager.startAnimation();
      this.setState(getStateFromLocation(location.hash));
    });

    const locationHash = history.location.hash;
    const shouldStart = !pauseRoutes.some(route => locationHash.indexOf(route) > -1);
    this.setState(getStateFromLocation(locationHash));
    if (shouldStart) {
      graphicsManager.startAnimation();
    }
  }

  componentWillUnmount() {
    graphicsManager.stopAnimation();
    window.removeEventListener('resize', this.onResize);
    this.remoteRouteChangeListener();
  }

  onResize() { graphicsManager.onResize(); }

  onAboutToggle = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ aboutIsShowing: !this.state.aboutIsShowing });
  };

  renderIcons() {
    return (
      <div>
        <ShuffleIcon
          title="Shuffle Animation"
          handleClick={graphicsManager.shuffleAnimations.bind(graphicsManager)}
          className={styles.shuffleButton} />
        <CarretVertical
          isActive={this.state.aboutIsShowing}
          handleClick={this.onAboutToggle}
          title="About Animation"
          className={styles.aboutButton} />
      </div>
    );
  }

  render() {
    return (
      <div
        onClick={() => this.setState({ aboutIsShowing: false })}
        className={this.props.className}>
        <canvas ref={ele => this.canvasElement = ele} />
        { this.state.iconsAreVisible ? this.renderIcons() : null }
        <div className={`${styles.about} ${this.state.aboutIsShowing ? styles.aboutActive : ''}`}>
          { graphicsManager.getAboutAnimationText() }
        </div>
      </div>
    );
  }
}

export default Home;
