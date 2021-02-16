import React from 'react';
import theme from '../../modules/theme';
import styles from './styles.scss';

const Back = props => {
  const arrowStyle = `${styles.arrow} ${theme.isLight() ? styles.arrowLight : ''}`;
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

export default Back;
