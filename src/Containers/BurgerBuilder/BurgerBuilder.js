import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import * as actions from '../../store/actions/index';
import Axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients()
  }, []);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, ele) => {
        return sum + ele
      }, 0);
    
    return sum > 0
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated)
      setPurchasing(true)
    else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/sign-in');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    //console.log(props)
    const queryParams = [];

    for (let i in props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i]))
    }
    queryParams.push(`price=${props.price}`);

    const queryString = queryParams.join('&');

    props.onInitPurchase();
    props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;
  let burger = props.error ? <h1 align="center">Ingredients can't be loaded, sorry.</h1> : <Spinner />

  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls 
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemove}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          price={props.price}
          isAuth={props.isAuthenticated} />
      </React.Fragment>
    )

    orderSummary = (
      <OrderSummary
        price={props.price}
        purchaseContinued={purchaseContinueHandler}
        purchaseCancelled={purchaseCancelHandler}
        ingredients={props.ings} />
    );
  }

  return (
    <React.Fragment>
      <Modal 
        modalClosed={purchaseCancelHandler}
        show={purchasing}>
        { orderSummary }          
      </Modal>
      { burger }
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, Axios));