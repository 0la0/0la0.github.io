export const THEME = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const storageKey = 'USER_PREFS';

const getInitialUserPreference = () => {
  const isLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return isLight ? THEME.LIGHT : THEME.DARK;
};

const toLocalStorage = (theme) => {
  const userPrefs = fromLocalStorage() || {};
  const updatedPrefs = Object.assign(userPrefs, { theme, });
  window.localStorage?.setItem(storageKey, JSON.stringify(updatedPrefs));
};

const fromLocalStorage = () => {
  try {
    const storedPrefs = window.localStorage.getItem(storageKey);
    if (!storedPrefs) {
      return null;
    }
    const userPrefs = JSON.parse(storedPrefs);
    return userPrefs.theme;
  } catch(error) {
    console.log(error);
    return {};
  }
};

const getInitialValue = () => {
  const storedValue = fromLocalStorage();
  return storedValue || getInitialUserPreference();
};

class ThemeStore {
  constructor() {
    this.theme = getInitialValue();
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
    toLocalStorage(this.theme);
  }

  isDark() {
    return this.theme === THEME.DARK;
  }

  isLight() {
    return this.theme === THEME.LIGHT;
  }
}
const singleton = new ThemeStore();

export default singleton;
