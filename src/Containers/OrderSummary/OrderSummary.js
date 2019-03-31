import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import Icons from '../../components/UI/Icons/Icons';
import withClass from '../../hoc/with-class/with-class';

import css from './OrderSummary.css'

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('[OrderSummary] Did Update');
    console.log(this.props)
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>
            <Icons size="small">arrow_drop_up</Icons>
          </span>
          <p>{ igKey } : { this.props.ingredients[igKey] }</p>
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
      <p><strong>Total Price: USD ${this.props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        clicked={this.props.purchaseCancelled}
        btnType="Danger">
        <span>CANCEL</span>
        <Icons size="small">close</Icons>
      </Button>
      <Button
        clicked={this.props.purchaseContinued}
        btnType="Success">
        <span>CONTINUE</span>
        <Icons size="small">check</Icons>
      </Button>
      </Aux>
    );
  }
}

export default React.memo(withClass(OrderSummary, css.OrderSummary));