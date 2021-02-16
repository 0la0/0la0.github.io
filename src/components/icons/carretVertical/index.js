import React from 'react';
import theme from '../../modules/theme';
import styles from './styles.scss';

const CarretVertical = props => {
  const barStyle = `${styles.bar} ${theme.isLight() ? styles.barLight : ''}`;
  return (
    <div
      className={props.className}
      title={props.title}
      onClick={props.handleClick}
    >
      <span className={`${barStyle} ${styles.barLeft} ${props.isActive ? styles.barLeftActive : ''}`} />
      <span className={`${barStyle} ${styles.barRight} ${props.isActive ? styles.barRightActive : ''}`} />
    </div>
  );
}

export default CarretVertical;
