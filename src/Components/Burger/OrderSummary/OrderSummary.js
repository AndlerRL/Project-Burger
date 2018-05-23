import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  //  this could be a functional component, doesn't have to be a class
  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <i className="fa fa-caret-right"></i>
            <span>{igKey}</span>: {this.props.ingredients[igKey]}
            {
              this.props.ingredients[igKey] === 0 ?
                <i className="fa fa-exclamation" title="Do you wanna leave it without it?"></i> :
                null
            }
          </li>
        )
      });

    return (
      <Aux>
        <span onClick={this.props.orderClosed}>
          <i className="fa fa-close" style={{
            top: '5px',
            marginRight: '-3px',
            position: 'relative',
            fontSize: '32px'
          }}></i>
        </span>
        <h3>
          Your Order
      </h3>
        <p> A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: <i className="fa fa-dollar"></i> {this.props.price.toFixed(2)}</strong></p>
        <div>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger" clicked={this.props.orderClosed}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.orderContinue}>CONTINUE</Button>
        </div>
      </Aux>
    );
  }
};

export default OrderSummary;