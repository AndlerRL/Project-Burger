import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    isLoading: false,
    isCheckout: false,
    error: false
  }

  componentDidMount() {
    console.log(this.props);
    /* Axios.get('/Ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      })
      .catch(err => {
        this.setState({
          error: true
        })
      }) */
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
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    this.setState({
      isLoading: true
    });
    //console.log(this.props)
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push(`price=${this.props.price}`);

    const queryString = queryParams.join('&');


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
    let burger = this.state.error ? <h1 align="center">Ingredients can't be loaded, sorry.</h1> : <Spinner />

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
            price={this.props.price} />
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

    if (this.state.isLoading)
      orderSummary = <Spinner />

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
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onIngredientRemove: ingName => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));