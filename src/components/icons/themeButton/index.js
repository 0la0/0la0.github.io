import React from 'react';
import themeHoc from '../../modules/themeHOC';
import styles from './styles.scss';

const ThemeButton = props => {
  const handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    props.toggleTheme();
  };
  return (
    <button
      className={`${props.className} ${styles.themeButton}`}
      onClick={handleClick}
      title={props.title}
      role="button"
      aria-label="Theme"
    >
      <div className={`${styles.themeIcon} ${props.themeIsLight ? '' : styles.themeIconDark}`} />
    </button>
  );
};

export default themeHoc(ThemeButton);
