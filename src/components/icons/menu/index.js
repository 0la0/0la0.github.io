import React from 'react';
import themeHoc from '../../modules/themeHOC';
import styles from './styles.scss';

const MenuIcon = props => {
  const lineStyle = `${styles.line} ${props.themeIsLight ? styles.lineLight : ''}`;
  return (
    <button
      className={`${props.className} ${styles.hamburger}`}
      onClick={props.handleClick}
      type="button"
      title="Menu"
    >
      <span className={`${lineStyle} ${props.isActive ? styles.lineOneActive : ''}`}></span>
      <span className={`${lineStyle} ${props.isActive ? styles.lineTwoActive : ''}`}></span>
      <span className={`${lineStyle} ${props.isActive ? styles.lineThreeActive : ''}`}></span>
    </button>
  );
};

export default themeHoc(MenuIcon);
