import React, { Component, } from 'react';

const THEME = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};
const THEME_CHANGE = 'THEME_CHANGE';

// TODO: combine this with local storage
const initTheme = () => {
  const isLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return isLight ? THEME.LIGHT : THEME.DARK;
};

class ThemeStore {
  constructor() {
    this.theme = THEME.LIGHT;
    this.observers = []; 
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  toggle = () => {
    this.theme = this.isDark() ? THEME.LIGHT : THEME.DARK;
    this.observers.forEach(observer => observer.handleThemeChange(this.theme));
  }

  isDark() {
    return this.theme === THEME.DARK;
  }

  isLight() {
    return this.theme === THEME.LIGHT;
  }
}
const themeStore = new ThemeStore();

const DisplayThemeHOC = WrappedComponent => {
  class DisplayTheme extends Component {
    constructor(props) {
      super(props);
      this.state = {
        theme: themeStore.theme,
      };
      themeStore.subscribe(this);
    }

    handleThemeChange = theme => this.setState({ theme, });

    toggleTheme = () => themeStore.toggle();

    componentWillUnmount() {
      themeStore.unsubscribe(this);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          theme={this.state.theme}
          toggleTheme={this.toggleTheme}
        />
      );
    }
  }
  return DisplayTheme;
}

export default DisplayThemeHOC;
export { themeStore, };
