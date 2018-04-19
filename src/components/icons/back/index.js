import React from 'react';
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

export default Back;
