import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import AOS from 'aos';

import * as actions from '../../store/actions/index';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
import Icons from '../../components/UI/Icons/Icons';
import Layout from '../Layout/Layout';
import Logout from '../Auth/Logout/Logout';
import Home from '../../components/Home/Home';

import css from './App.css';

const AsyncCheckout = asyncComponent(() => {
  return import('../Checkout/Checkout');
})
const AsyncOrders = asyncComponent(() => {
  return import('../Orders/Orders');
})
const AsyncSignIn = asyncComponent(() => {
  return import('../Auth/AuthIn');
})
const AsyncSignUp = asyncComponent(() => {
  return import('../Auth/AuthUp');
})

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
    AOS.init({
      duration: 1500
    })
  }

  componentDidUpdate () {
    AOS.refresh()
  }

  render() {
    let routes = (
      <Switch data-aos="fade-left">
        <Route exact path="/" component={Home} />
        <Route exact path="/burger-builder" component={BurgerBuilder} />
        <Route exact path="/sign-in" component={AsyncSignIn} />
        <Route exact path="/sign-up" component={AsyncSignUp} />
        <Route render={() => (
          <div className={'z-depth-2 ' + css.ErrorPage}>
            <h1>
            <Icons size="large">sentiment_very_dissatisfied</Icons>
              404 Page not Found
            </h1>
            <p>Maybe you are trying to reach a site where you are not authorized. Create an account and try it out!</p>
          </div>
        )} />
      </Switch>
    )

    if (this.props.isAuthenticated)
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route exact path="/orders" component={AsyncOrders} />
          <Route exact path="/" component={Home} />
          <Route exact path="/burger-builder" component={BurgerBuilder} />
          <Route exact path="/sign-in" component={AsyncSignIn} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));