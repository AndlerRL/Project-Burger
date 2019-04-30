import React from 'react';

import Button from '../../components/UI/Button/Button';
import Icon from '../../components/UI/Icons/Icons';
import withClass from '../../hoc/with-class/with-class';

import css from './OrderSummary.css'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span>
            <Icon size="small">arrow_drop_up</Icon>
            { igKey } :
          </span>
          <span> { props.ingredients[igKey] }</span> 
        </li>
      );
    });

  return (
    <React.Fragment>
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
      <Icon size="small">close</Icon>
    </Button>
    <Button
      clicked={props.purchaseContinued}
      btnType="Success">
      <span>CONTINUE</span>
      <Icon size="small">check</Icon>
    </Button>
    </React.Fragment>
  );
}

export default React.memo(withClass(orderSummary, css.OrderSummary));