import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AOS from 'aos';

import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

import css from './Burger.css';

const burger = props => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 500
    })

    return () => {
      AOS.refresh();
    }
  }, []);

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
    <div className={css.Burger} data-aos="fade-right">
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);