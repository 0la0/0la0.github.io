import React from 'react';
import outsideClickHandler from '../modules/outsideClickHandler';
import styles from './styles.scss';

const AboutAnimation = props => {
  const componentRef = outsideClickHandler(props.handleOutsideClick);
  return (
    <div
      ref={componentRef}
      className={`${styles.about} ${props.isVisible ? styles.aboutActive : ''}`}
    >
      {props.content}
    </div>
  );
};

export default AboutAnimation;
