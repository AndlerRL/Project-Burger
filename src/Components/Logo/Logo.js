import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import css from './Logo.css';

const logo = props => (
  <div
    className={css.Logo}
    style={{height: props.height}}>
    <img src={burgerLogo} alt="Burger-Logo" />
  </div>
);

export default logo;