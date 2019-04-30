import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { useState } from 'react';

import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import css from './Auth.css';

const auth = props => {
  const [controlsUp, setControlsUp] = useState({
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
    },
    confirmPassword: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'password',
      },
      label: 'Confirm Password',
      value: '',
      validation: {
        required: true,
        minLength: 6,
        sameAsPW: true
      },
      valid: false,
      touched: false,
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  const checkValidity = (value, rules) => {
    let isValid = true;
  
    if (rules.required)
      isValid = value.trim() !== '' && isValid;
  
    if (rules.minLength) 
      isValid = value.length >= rules.minLength && isValid;
  
    if (rules.maxLength) 
      isValid = value.length <= rules.maxLength && isValid;
    
    if (rules.emailFormat)
      isValid = rules.emailFormat.test(value) && isValid;
  
    if (rules.sameAsPW) {
      isValid = value === controlsUp.password.value && isValid;
    }
  
    return isValid;
  }

  const inputChangedHandler = (e, controlName) => {
    const updatedControlsUp = updateObject(controlsUp, {
      [controlName]: updateObject(controlsUp[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, controlsUp[controlName].validation),
        touched: true
      })
    });
    
    setControlsUp(updatedControlsUp);
  }

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(controlsUp.email.value, controlsUp.password.value, isSignup);
    setIsSignup(false)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(false);
  }

  const formUpElementsArray = [];

  for (let key in controlsUp) {
    formUpElementsArray.push({
      id: key,
      config: controlsUp[key]
    })
  }

  let form = formUpElementsArray.map(formEle => (
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

  let signInRedirect = null;

  if (!isSignup)
      signInRedirect = <Redirect to="/sign-in" />

  return (
    <div className={css.Container}>
      { signInRedirect }
      <div className={css.Login_BG}>
      </div>
        <div className={"z-depth-2 " + css.Login}>
          <form onSubmit={submitHandler}>
          <h4>Burger Builder App</h4>
          <h6>... a burger, made by you!</h6>
            { errorMsg }
            { form }
            <Button btnType="Success">
              Sign Up
            </Button>
          </form>
          <p>Already have an account? Go and
            <Button 
              clicked={switchAuthModeHandler}
              btnType="Danger">
              Sign In
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
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);