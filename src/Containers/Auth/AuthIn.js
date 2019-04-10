import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import css from './Auth.css';

class Auth extends Component {
  state = {
    controlsIn: {
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
    },
    isSignup: false
  }

  componentDidMount () {
    if (!this.props.building && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
  } 

  inputChangedHandler = (e, controlName) => {
    const updatedControlsIn = updateObject(this.state.controlsIn, {
      [controlName]: updateObject(this.state.controlsIn[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state.controlsIn[controlName].validation),
        touched: true
      })
    });
    
    this.setState({
      controlsIn: updatedControlsIn
    })
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(this.state.controlsIn.email.value, this.state.controlsIn.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState({
      isSignup: true
    })
  }

  render () {
    const formInElementsArray = [];

    for (let key in this.state.controlsIn) {
      formInElementsArray.push({
        id: key,
        config: this.state.controlsIn[key]
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
          changed={e => this.inputChangedHandler(e, formEle.id)} />
      ))

    if (this.props.isLoading)
      form = <Spinner />

    let errorMsg = null;

    if (this.props.error)
      errorMsg = (
        <p className={'z-depth-1 ' + css.ErrorMsg}>ERROR: { this.props.error.message }</p>
      );

    let authRedirect = null;
    let signUpRedirect = null;
    
    if (this.props.isAuthenticated)
      authRedirect = <Redirect to={this.props.authRedirectPath} />

    if (this.state.isSignup)
        signUpRedirect = <Redirect to="/sign-up" />

    return (
      <div className={css.Container}>
        { authRedirect }
        { signUpRedirect }
        <div className={css.Login_BG}>
        </div>
          <div className={"z-depth-2 " + css.Login}>
            <form onSubmit={this.submitHandler}>
            <h4>Burger Builder App</h4>
            <h6>... a burger, made by you!</h6>
              { errorMsg }
              { form }
              <Button btnType="Success">Sign In</Button>
            </form>
            <p>Don't have an account? Go and 
              <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">
                Sign Up
              </Button>here!
            </p>
          </div>
      </div>
    );
  }
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
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);