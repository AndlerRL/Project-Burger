import React from 'react';

import smallShopImg from '../../../../assets/images/small-restaurant.jpg';
import css from './SmallShop.css';

const pokeball = props => (
  <div
    className={css.SmallShop}
    style={{height: props.height, width: props.width}}>
    <img src={smallShopImg} alt="very-first-restaurant" />
  </div>
);

export default pokeball;