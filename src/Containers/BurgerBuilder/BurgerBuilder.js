import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    isCheckout: false,
  }

  componentDidMount() {
    //console.log(this.props);
    this.props.onInitIngredients()
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, ele) => {
        return sum + ele
      }, 0);
    
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated)
      this.setState({
        purchasing: true
      })
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/sign-in');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    //console.log(this.props)
    const queryParams = [];

    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
    }
    queryParams.push(`price=${this.props.price}`);

    const queryString = queryParams.join('&');

    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.props.error ? <h1 align="center">Ingredients can't be loaded, sorry.</h1> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          price={this.props.price}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          ingredients={this.props.ings} />
      );
    }

    return (
      <Aux>
        <Modal 
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}>
          { orderSummary }          
        </Modal>
        { burger }
      </Aux>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));