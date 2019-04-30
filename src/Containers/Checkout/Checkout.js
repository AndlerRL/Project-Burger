import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data/');
  }
  
  let summary = <Redirect to="/" />

  if (props.ings) {
    const purchaseRedirect = props.purchased ? <Redirect to="/burger-builder" /> : null;
    summary = (
      <React.Fragment>
        { purchaseRedirect }
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancel={checkoutCancelledHandler}
          checkoutContinue={checkoutContinuedHandler} />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData} />
      </React.Fragment>
    );
  }

  return (
    summary
  )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(React.memo(checkout));