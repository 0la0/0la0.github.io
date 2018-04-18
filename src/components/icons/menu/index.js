import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

MenuIcon.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default MenuIcon;
