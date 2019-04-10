import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import AuthIn from '../Auth/AuthIn';
import AuthUp from '../Auth/AuthUp';
import Logout from '../Auth/Logout/Logout';
import Layout from '../Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import Icons from '../../components/UI/Icons/Icons';

import css from './App.css';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route exact path="/sign-in" component={AuthIn} />
        <Route exact path="/sign-up" component={AuthUp} />
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
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/" component={BurgerBuilder} />
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