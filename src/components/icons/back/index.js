import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Back = props => (
  <div
    onClick={props.handleClick}
    className={`${props.className} ${styles.back} ${props.isActive ? styles.backActive : ''}`}>
    <span className={`${styles.arrow} ${styles.arrowTop} ${props.isActive ? styles.arrowTopActive : ''}`} />
    <span className={`${styles.arrow} ${styles.arrowBottom} ${props.isActive ? styles.arrowBottomActive : ''}`} />
    <span className={`${styles.arrow} ${styles.arrowCenter} ${props.isActive ? styles.arrowCenterActive : ''}`} />
  </div>
);

Back.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Back;
