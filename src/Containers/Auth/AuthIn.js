import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import css from './Auth.css';

const auth = props => {
  const [controlsIn, setControlsIn] = useState({
    email: {
      elementType: 'email',
      elementConfig: {
        type: 'text',
        placeholder: 'E-mail Address',
      },
      label: 'E-mail',
      value: '',
      validation: {
        required: true,
        emailFormat: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        minLength: 6
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'password',
      },
      label: 'Password',
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
    }
  });
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (!props.building && props.authRedirectPath !== '/')
      props.onSetAuthRedirectPath();
  }, [])

  const inputChangedHandler = (e, controlName) => {
    const updatedControlsIn = updateObject(controlsIn, {
      [controlName]: updateObject(controlsIn[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controlsIn[controlName].validation),
        touched: true
      })
    });
    
    setControlsIn(updatedControlsIn)
  }

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(controlsIn.email.value, controlsIn.password.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(true)
  }

  const formInElementsArray = [];

  for (let key in controlsIn) {
    formInElementsArray.push({
      id: key,
      config: controlsIn[key]
    })
  }

  let form = formInElementsArray.map(formEle => (
      <Input
        key={formEle.id}
        invalid={!formEle.config.valid}
        shouldValidate={formEle.config.validation}
        touched={formEle.config.touched}
        elementType={formEle.config.elementType}
        elementConfig={formEle.config.elementConfig}
        value={formEle.config.value}
        label={formEle.config.label}
        for={formEle.id}
        changed={e => inputChangedHandler(e, formEle.id)} />
    ))

  if (props.isLoading)
    form = <Spinner />

  let errorMsg = null;

  if (props.error)
    errorMsg = (
      <p className={'z-depth-1 ' + css.ErrorMsg}>ERROR: { props.error.message }</p>
    );

  let authRedirect = null;
  let signUpRedirect = null;
  
  if (props.isAuthenticated)
    authRedirect = <Redirect to={props.authRedirectPath} />

  if (isSignup)
      signUpRedirect = <Redirect to="/sign-up" />

  return (
    <div className={css.Container}>
      { authRedirect }
      { signUpRedirect }
      <div className={css.Login_BG}>
      </div>
        <div className={"z-depth-2 " + css.Login}>
          <form onSubmit={submitHandler}>
          <h4>Burger Builder App</h4>
          <h6>... a burger, made by you!</h6>
            { errorMsg }
            { form }
            <Button btnType="Success">Sign In</Button>
          </form>
          <p>Don't have an account? Go and 
            <Button 
              clicked={switchAuthModeHandler}
              btnType="Danger">
              Sign Up
            </Button>here!
          </p>
        </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/burger-builder'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);