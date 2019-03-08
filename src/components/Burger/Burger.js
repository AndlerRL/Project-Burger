import React from 'react';

import css from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = props => {
  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="bacon" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;