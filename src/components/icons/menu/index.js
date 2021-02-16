import React from 'react';
import themeHoc from '../../modules/theme';
import styles from './styles.scss';

const MenuIcon = props => {
  const isLight = props.theme === 'LIGHT';
  const lineStyle = `${styles.line} ${isLight ? styles.lineLight : ''}`;
  return (
    <div
      className={`${props.className} ${styles.hamburger}`}
      onClick={props.handleClick}
    >
      <span className={`${lineStyle} ${props.isActive ? styles.lineOneActive : ''}`}></span>
      <span className={`${lineStyle} ${props.isActive ? styles.lineTwoActive : ''}`}></span>
      <span className={`${lineStyle} ${props.isActive ? styles.lineThreeActive : ''}`}></span>
    </div>
  );
};

export default themeHoc(MenuIcon);
