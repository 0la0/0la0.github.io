import React from 'react';
import themeHoc from '../../modules/themeHOC';
import styles from './styles.scss';

const CarretVertical = props => {
  const barStyle = `${styles.bar} ${props.themeIsLight ? styles.barLight : ''}`;
  return (
    <button
      className={props.className}
      title={props.title}
      onClick={props.handleClick}
      type="button"
    >
      <span className={`${barStyle} ${styles.barLeft} ${props.isActive ? styles.barLeftActive : ''}`} />
      <span className={`${barStyle} ${styles.barRight} ${props.isActive ? styles.barRightActive : ''}`} />
    </button>
  );
}

export default themeHoc(CarretVertical);
