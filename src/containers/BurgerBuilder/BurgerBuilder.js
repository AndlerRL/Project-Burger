import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1.15,
    purchasable: false,
    purchasing: false,
    isLoading: false,
    error: false
  }

  componentDidMount() {
    Axios.get('/Ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      })
      .catch(err => {
        this.setState({
          error: true
        })
      })
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, ele) => {
        return sum + ele
      }, 0);
    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    updatedIngredients[type] = updatedCount;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    
    updatedIngredients[type] = updatedCount;
    
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })

    this.updatePurchaseState(updatedIngredients);

    if (oldCount <= 0) {
      return null;
    }
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

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      //On a real app, the price should be recalculated on the server, so user cannot manipulate it
      customer: {
        name: 'Robert Lucas',
        address: {
          street: '1300 Tuxedo rd',
          zipCode: '10109',
          state: 'Texas',
          country: 'United States'
        },
        email: 'test@test.uk'
      },
      deliveryMethod: 'ASAP'
    }
    Axios.post('/orders.json', order)
      .then(res => {
        console.log(res)
        this.setState({
          isLoading: false,
          purchasing: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          isLoading: false,
          purchasing: false
        })
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <h1 align="center">Ingredients can't be loaded, sorry.</h1> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice} />
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          ingredients={this.state.ingredients} />
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

export default withErrorHandler(BurgerBuilder, Axios);