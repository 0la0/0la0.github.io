import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

CarretVertical.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CarretVertical;
