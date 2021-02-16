const THEME = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const initTheme = () => {
  const isLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return isLight ? THEME.LIGHT : THEME.DARK;
};

class DisplayTheme {
  constructor() {
    // this._theme = initTheme();
    this._theme = THEME.LIGHT;
  }

  getTheme() {
    return this._theme;
  }

  isDark() {
    return this._theme === THEME.DARK;
  }

  isLight() {
    return this._theme === THEME.LIGHT;
  }
}

const displayTheme = new DisplayTheme();
export default displayTheme;
