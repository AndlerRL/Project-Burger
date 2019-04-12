import React from 'react';
import { withRouter } from 'react-router-dom';
import AOS from 'aos';

import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

import css from './Burger.css';

class burger extends React.Component {
  componentDidMount () {
    AOS.init({
      duration: 500,
      offset: 500
    })
  }

  componentDidUpdate () {
    AOS.refresh();
  }

  render () {
    let transformedIngredients = Object.keys(this.props.ingredients)
      .map(igKey => {
        return [...Array(this.props.ingredients[igKey])].map((_, index) => {
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
}

export default withRouter(burger);