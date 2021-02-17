import React from 'react';
import themeHoc from '../../modules/themeHOC';
import styles from './styles.scss';

const Back = props => {
  const arrowStyle = `${styles.arrow} ${props.themeIsLight ? styles.arrowLight : ''}`;
  return (
    <button
      onClick={props.handleClick}
      type="button"
      className={`${props.className} ${styles.back} ${props.isActive ? styles.backActive : ''}`}>
      <span className={`${arrowStyle} ${styles.arrowTop} ${props.isActive ? styles.arrowTopActive : ''}`} />
      <span className={`${arrowStyle} ${styles.arrowBottom} ${props.isActive ? styles.arrowBottomActive : ''}`} />
      <span className={`${arrowStyle} ${styles.arrowCenter} ${props.isActive ? styles.arrowCenterActive : ''}`} />
    </button>
  );
};

export default themeHoc(Back);
