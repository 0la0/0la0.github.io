import React, { Component, } from 'react';
import themeStore from './ThemeStore';

const DisplayThemeHOC = WrappedComponent => {
  class DisplayTheme extends Component {
    constructor(props) {
      super(props);
      this.state = {
        themeIsLight: themeStore.isLight(),
      };
      themeStore.subscribe(this);
    }

    handleThemeChange = () => this.setState({ themeIsLight: themeStore.isLight(), });

    toggleTheme = () => themeStore.toggle();

    componentWillUnmount() {
      themeStore.unsubscribe(this);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          themeIsLight={this.state.themeIsLight}
          toggleTheme={this.toggleTheme}
        />
      );
    }
  }
  return DisplayTheme;
}

export default DisplayThemeHOC;
