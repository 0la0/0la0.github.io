import React from 'react';
import themeHoc from '../../modules/theme';
import styles from './styles.scss';

const Back = props => {
  const isLight = props.theme === 'LIGHT';
  const arrowStyle = `${styles.arrow} ${isLight ? styles.arrowLight : ''}`;
  return (
    <div
      onClick={props.handleClick}
      className={`${props.className} ${styles.back} ${props.isActive ? styles.backActive : ''}`}>
      <span className={`${arrowStyle} ${styles.arrowTop} ${props.isActive ? styles.arrowTopActive : ''}`} />
      <span className={`${arrowStyle} ${styles.arrowBottom} ${props.isActive ? styles.arrowBottomActive : ''}`} />
      <span className={`${arrowStyle} ${styles.arrowCenter} ${props.isActive ? styles.arrowCenterActive : ''}`} />
    </div>
  );
};

export default themeHoc(Back);
