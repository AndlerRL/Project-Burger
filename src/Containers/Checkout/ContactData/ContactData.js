import React, { Component } from 'react';
import Axios from '../../../axios-orders';
import { connect } from 'react-redux';
import M from 'materialize-css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import ContactDataSummary from '../../../components/Order/CheckoutSummary/ContactDataSummary/ContactDataSummary';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Icon from '../../../components/UI/Icons/Icons';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Jane Doe',
        },
        label: 'Your Name',
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1300 Tuxedo rd',
        },
        label: 'Street',
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '10109',
        },
        label: 'Zip Code',
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 5,
          maxLength: 5
        }
      },
      state: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Texas',
        },
        label: 'State',
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'United States',
        },
        label: 'Country',
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'example@example.com',
        },
        label: 'E-mail',
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false,
          emailFormat: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          minLength: 6
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'ASAP' },
            { value: 'fast', displayValue: 'Fast' },
            { value: 'normal', displayValue: 'Regular' },
            { value: 'slow', displayValue: 'Got time, no worries' },
          ]
        },
        label: 'Delivery Method',
        value: 'Choose your Delivery Option',
        validation: {
          required: false,
          valid: false,
          touched: false
        }
      }
    },
    formIsValid: false,
    isLoading: false,
    input: 0
  }

  inputRef = React.createRef();

  inputs = {
    name: () => {
      this.inputRef.current.form[0].focus()
    },
    street: () => {
      this.inputRef.current.form[1].focus()
      this.setState({ input: 1 })
    },
    zipCode: () => {
      this.inputRef.current.form[2].focus()
      this.setState({ input: 2 })
    },
    state: () => {
      this.inputRef.current.form[3].focus()
      this.setState({ input: 3 })
    },
    country: () => {
      this.inputRef.current.form[4].focus()
      this.setState({ input: 4 })
    },
    email: () => {
      this.inputRef.current.form[5].focus()
      this.setState({ input: 5 })
    },
    deliveryMethod: () => {
      this.inputRef.current.form[6].focus()
      this.setState({ input: 6 })
    }
  }

  componentDidMount() {
    //console.log(this.props);
    this.inputs.name();
    M.AutoInit();
  }

  onSubmit = e => {
    if (e.key === 'Enter' || e.which === 13) {
      if (this.state.input === 0)
        return this.inputs.street();

      if (this.state.input === 1)
        return this.inputs.zipCode();

      if (this.state.input === 2)
        return this.inputs.state();

      if (this.state.input === 3)
        return this.inputs.country();

      if (this.state.input === 4)
        return this.inputs.email();

      if (this.state.input === 5)
        return this.inputs.deliveryMethod();

      if (this.state.input === 6)
        return null;
    }
  }

  orderBurgerHandler = e => {
    e.preventDefault();
    //console.log(this.props.ingredients);
    const formData = {};

    for (let formEleId in this.state.orderForm) {
      formData[formEleId] = this.state.orderForm[formEleId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }
    Axios.post('/orders.json', order)
      .then(res => {
        console.log(res)
        this.setState({
          isLoading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(err)
        this.setState({
          isLoading: false
        })
      });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required)
      isValid = value.trim() !== '' && isValid;

    if (rules.minLength) 
      isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) 
      isValid = value.length <= rules.maxLength && isValid;
    
    if (rules.emailFormat)
      isValid = rules.emailFormat.test(value) && isValid;

    return isValid;
  }

  inputChangedHandler = (e, inputId) => {
    let formIsValid = true;
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormEle = {
      ...updatedOrderForm[inputId]
    }
    updatedFormEle.value = e.target.value;
    updatedFormEle.validation.valid = this.checkValidity(updatedFormEle.value, updatedFormEle.validation);
    updatedFormEle.validation.touched = true;
    updatedOrderForm[inputId] = updatedFormEle;
    //console.log(updatedFormEle);

    for (let inputIds in updatedOrderForm)
      formIsValid = updatedOrderForm[inputIds].validation.valid && formIsValid;
    //console.log(formIsValid);

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  render () {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = formElementsArray.map(formEle => (
      <Input
        inputRef={this.inputRef}
        keyPress={this.onSubmit}
        invalid={!formEle.config.validation.valid}
        shouldValidate={formEle.config.validation}
        touched={formEle.config.validation.touched}
        key={formEle.id}
        elementType={formEle.config.elementType}
        elementConfig={formEle.config.elementConfig}
        value={formEle.config.value}
        label={formEle.config.label}
        for={formEle.id}
        changed={e => this.inputChangedHandler(e, formEle.id)} />
    ));

    if (this.state.isLoading)
      form = <Spinner />;

    return(
      <ContactDataSummary
        form="Form"
        submit={this.orderBurgerHandler}>
        { form }

        <Button
          disabled={!this.state.formIsValid}
          btnType="Success">
          ORDER
          <Icon size="small">attach_money</Icon>
        </Button>
      </ContactDataSummary> 
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);