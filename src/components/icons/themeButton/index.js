import React, { useState, } from 'react';
import themeHoc from '../../modules/theme';
import styles from './styles.scss';

const ThemeButton = props => {
  const isLight = props.theme === 'LIGHT';
  return (
    <button
      className={`${props.className} ${styles.themeButton}`}
      onClick={props.toggleTheme}
      title={props.title}
      role="button"
      aria-label="Theme"
    >
      <div className={`${styles.themeIcon} ${isLight ? styles.themeIconLight : styles.themeIconDark}`} />
    </button>
  );
};

export default themeHoc(ThemeButton);
