import React from 'react';

import Button from '../../UI/Button/Button';
import Icons from '../../UI/Icons/Icons';
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
      <p><strong>Total Price: USD ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        clicked={props.purchaseCancelled}
        btnType="Danger">
        <span>CANCEL</span>
        <Icons size="small">close</Icons>
      </Button>
      <Button
        clicked={props.purchaseContinued}
        btnType="Success">
        <span>CONTINUE</span>
        <Icons size="small">check</Icons>
      </Button>
    </Aux>
  )
}

export default withClass(orderSummary, css.OrderSummary);