import React, { Component } from 'react';
import styles from './styles.scss';

const MenuIcon = props => (
  <div
    className={`${props.className} ${styles.hamburger}`}
    onClick={props.handleClick}
  >
    <span className={`${styles.line} ${props.isActive ? styles.lineOneActive : ''}`}></span>
    <span className={`${styles.line} ${props.isActive ? styles.lineTwoActive : ''}`}></span>
    <span className={`${styles.line} ${props.isActive ? styles.lineThreeActive : ''}`}></span>
  </div>
);

export default MenuIcon;
