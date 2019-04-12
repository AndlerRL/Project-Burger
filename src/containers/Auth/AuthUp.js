import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import AOS from 'aos';

import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import css from './Auth.css';

class Auth extends Component {
  state = {
    controlsUp: {
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
    },
    isSignup: true
  }

  componentDidMount () {
    AOS.init({
      duration: 500,
      offset: 10,
      delay: 0
    })
  }

  componentDidUpdate () {
    AOS.refresh();
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControlsUp = updateObject(this.state.controlsUp, {
      [controlName]: updateObject(this.state.controlsUp[controlName], {
        value: e.target.value,
        valid: checkValidity(e.target.value, this.state.controlsUp[controlName].validation),
        touched: true
      })
    });
    
    this.setState({
      controlsUp: updatedControlsUp
    })
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(this.state.controlsUp.email.value, this.state.controlsUp.password.value, this.state.isSignup);
    this.setState({
      isSignup: false
    })
  }

  switchAuthModeHandler = () => {
    this.setState({
      isSignup: false
    })
  }

  render () {
    const formUpElementsArray = [];

    for (let key in this.state.controlsUp) {
      formUpElementsArray.push({
        id: key,
        config: this.state.controlsUp[key]
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
            changed={e => this.inputChangedHandler(e, formEle.id)} />
        ))

    if (this.props.isLoading)
      form = <Spinner />

    let errorMsg = null;

    if (this.props.error)
      errorMsg = (
        <p className={'z-depth-1 ' + css.ErrorMsg}>ERROR: { this.props.error.message }</p>
      );

    let signInRedirect = null;

    if (!this.state.isSignup)
        signInRedirect = <Redirect to="/sign-in" />

    return (
      <div className={css.Container}>
        { signInRedirect }
        <div className={css.Login_BG}>
        </div>
          <div className={"z-depth-2 " + css.Login} data-aos="fade-left">
            <form onSubmit={this.submitHandler}>
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
                clicked={this.switchAuthModeHandler}
                btnType="Danger">
                Sign In
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
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);