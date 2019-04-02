import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import Icons from '../../components/UI/Icons/Icons';

import css from './App.css';

class App extends Component {
  state = {
    isCheckout: true
  }

  render() {
    return (
      <Layout>
        <Switch>
          { this.state.isCheckout ? <Route path="/checkout" component={Checkout} /> : null }
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/" component={BurgerBuilder} />
          <Route render={() => (
            <div className={css.ErrorPage}>
              <h1><Icons size="large">sentiment_very_dissatisfied</Icons> 404 Page not Found</h1>
            </div>
          )} />
        </Switch>
      </Layout>
    );
  }
}

export default App;