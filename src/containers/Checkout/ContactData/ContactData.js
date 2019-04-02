import React, { Component } from 'react';
import Axios from '../../../axios-orders';
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
    isLoading: false
  }

  componentDidMount() {
    //console.log(this.props);
    M.AutoInit();
  }

  orderBurgerHandler = e => {
    e.preventDefault();
    //console.log(this.props.ingredients);
    const formData = {};

    for (let formEleId in this.state.orderForm) {
      formData[formEleId] = this.state.orderForm[formEleId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
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

export default ContactData;