import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import ShuffleIcon from 'components/icons/shuffle';
import CarretVertical from 'components/icons/carretVertical';
import graphicsManager from 'components/home/modules/graphicsManager';
import styles from './styles.scss';

const pauseRoutes = new Set(['#/projects']);
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
    graphicsManager.init(this.canvasElement).startAnimation();
    window.addEventListener('resize', this.onResize);
    this.remoteRouteChangeListener = history.listen((location, action) => {
      if (pauseRoutes.has(location.hash)) {
        graphicsManager.stopAnimation();
      } else {
        graphicsManager.startAnimation();
      }
      this.setState(getStateFromLocation(location.hash));
    });
    this.setState(getStateFromLocation(history.location.hash));
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

  render() {
    return (
      <div
        onClick={() => this.setState({ aboutIsShowing: false })}
        className={this.props.className}>
        <canvas ref={ele => this.canvasElement = ele} />
        { this.state.iconsAreVisible ?
          <ShuffleIcon
            title="Shuffle Animation"
            handleClick={graphicsManager.shuffleAnimations.bind(graphicsManager)}
            className={styles.shuffleButton}/> : null
        }
        { this.state.iconsAreVisible ?
          <CarretVertical
            isActive={this.state.aboutIsShowing}
            handleClick={this.onAboutToggle}
            title="About Animation"
            className={styles.aboutButton} /> : null
        }
        <div className={`${styles.about} ${this.state.aboutIsShowing ? styles.aboutActive : ''}`}>
          { graphicsManager.getAboutAnimationText() }
        </div>
      </div>
    );
  }
}

export default Home;
