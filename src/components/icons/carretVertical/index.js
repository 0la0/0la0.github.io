import React, { Component } from 'react';
import styles from './styles.scss';

const CarretVertical = props => (
  <div
    className={props.className}
    title={props.title}
    onClick={props.handleClick}
  >
    <span className={`${styles.bar} ${styles.barLeft} ${props.isActive ? styles.barLeftActive : ''}`} />
    <span className={`${styles.bar} ${styles.barRight} ${props.isActive ? styles.barRightActive : ''}`} />
  </div>
);

export default CarretVertical;
