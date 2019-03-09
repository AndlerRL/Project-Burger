import React from 'react';

import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/with-class';
import css from './OrderSummary.css'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span>
            <i className={"small material-icons"}>arrow_drop_up</i>{igKey}:
          </span> {props.ingredients[igKey]}
        </li>
      );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  )
}

export default withClass(orderSummary, css.OrderSummary);