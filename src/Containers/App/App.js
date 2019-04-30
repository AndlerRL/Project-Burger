import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import AOS from 'aos';

import * as actions from '../../store/actions/index';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder'
import Icons from '../../components/UI/Icons/Icons';
import Layout from '../Layout/Layout';
import Logout from '../Auth/Logout/Logout';
import Home from '../../components/Home/Home';
import Spinner from '../../components/UI/Spinner/Spinner';

import css from './App.css';

const Checkout = React.lazy(() => {
  return import('../Checkout/Checkout');
})
const Orders = React.lazy(() => {
  return import('../Orders/Orders');
})
const SignIn = React.lazy(() => {
  return import('../Auth/AuthIn');
})
const SignUp = React.lazy(() => {
  return import('../Auth/AuthUp');
})

const app = props => {
  useEffect(() => {
    props.onTryAutoSignUp();
    AOS.init({
      duration: 1500
    })

    return () => {
      AOS.refresh()
    }
  }, [])

  let routes = (
    <Switch data-aos="fade-left">
      <Route exact path="/" component={Home} />
      <Route exact path="/burger-builder" component={BurgerBuilder} />
      <Route exact path="/sign-in" render={props => <SignIn {...props} />} />
      <Route exact path="/sign-up" render={props => <SignUp {...props} />} />
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

  if (props.isAuthenticated)
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route exact path="/orders" render={props => <Orders {...props} />} />
        <Route exact path="/" component={Home} />
        <Route exact path="/burger-builder" component={BurgerBuilder} />
        <Route exact path="/sign-in" render={props => <SignIn {...props} />} />
        <Route exact path="/logout" render={props => <Logout {...props} />} />
        <Redirect to="/" />
      </Switch>
    )

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        { routes }
      </Suspense>
    </Layout>
  );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));