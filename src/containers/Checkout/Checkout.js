import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data/');
  }
  
  render () {
    let summary = <Redirect to="/" />

    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/burger-builder" /> : null;
      summary = (
        <Aux>
          { purchaseRedirect }
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinuedHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </Aux>
      );
    }

    return (
      summary
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(React.memo(Checkout));