import React from 'react';

import css from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />
      })
    })
    .reduce((arr, ele) => {
      return arr.concat(ele)
    }, []);

  if (transformedIngredients.length === 0)
    transformedIngredients = <p className={css.NoIngredients}>Please, start adding ingredients!</p>

  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;