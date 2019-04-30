import { connect } from 'react-redux';
import M from 'materialize-css';
import React, { useState, useEffect } from 'react';

import { updateObject, checkValidity } from '../../../shared/utility';
import * as action from '../../../store/actions/index';
import Axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import ContactDataSummary from '../../../components/Order/CheckoutSummary/ContactDataSummary/ContactDataSummary';
import Icon from '../../../components/UI/Icons/Icons';
import Input from '../../../components/UI/Forms/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const contactData = props => {
  const [orderForm, setOrderForm] = useState({
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
    },
    additionalInfo: {
      elementType: 'textarea',
      elementConfig: {
        type: 'textarea',
        placeholder: '[Opcional] Extra onion, mustard / Ring the bell...'
      },
      label: 'Additional Information',
      value: '',
      validation: {
        required: false,
        valid: false,
        touched: false
      }
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [input, setInput] = useState(0);

  const inputRef = React.createRef();

  const inputs = {
    name: () => {
      inputRef.current.form[0].focus()
    },
    street: () => {
      inputRef.current.form[1].focus()
      setInput(1);
    },
    zipCode: () => {
      inputRef.current.form[2].focus()
      setInput(2);
    },
    state: () => {
      inputRef.current.form[3].focus()
      setInput(3);
    },
    country: () => {
      inputRef.current.form[4].focus()
      setInput(4);
    },
    email: () => {
      inputRef.current.form[5].focus()
      setInput(5);
    },
    deliveryMethod: () => {
      inputRef.current.form[6].focus()
      setInput(6);
    },
    additionalInfo: () => {
      inputRef.current.form[7].focus()
      setInput(7);
    }
  }

  useEffect(() => {
    inputs.name();
    M.AutoInit();
  }, []);

  const onSubmit = e => {
    if (e.key === 'Enter' || e.which === 13) {
      if (input === 0)
        return inputs.street();

      if (input === 1)
        return inputs.zipCode();

      if (input === 2)
        return inputs.state();

      if (input === 3)
        return inputs.country();

      if (input === 4)
        return inputs.email();

      if (input === 5)
        return inputs.deliveryMethod();

      if (input === 6)
        return inputs.additionalInfo();

      if (input === 7)
        return null;
    }
  }

  const orderBurgerHandler = e => {
    e.preventDefault();
    //console.log(props.ingredients);
    const formData = {};

    for (let formEleId in orderForm) {
      formData[formEleId] = orderForm[formEleId].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    }

    props.onOrderBurger(order, props.token);
  }

  const inputChangedHandler = (e, inputId) => {
    let formIsValid = true;
    const updatedFormEle = updateObject(orderForm[inputId], {
      value: e.target.value,
      validation: {...orderForm[inputId].validation,
        valid: checkValidity(e.target.value, orderForm[inputId].validation),
        touched: true
      }
    })
    const updatedOrderForm = updateObject(orderForm, {
      [inputId]: updatedFormEle 
    })

    for (let inputIds in updatedOrderForm)
      formIsValid = updatedOrderForm[inputIds].validation.valid && formIsValid;
    //console.log(formIsValid);

    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid);
  }

  const formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = formElementsArray.map(formEle => (
    <Input
      inputRef={inputRef}
      keyPress={onSubmit}
      invalid={!formEle.config.validation.valid}
      shouldValidate={formEle.config.validation}
      touched={formEle.config.validation.touched}
      key={formEle.id}
      elementType={formEle.config.elementType}
      elementConfig={formEle.config.elementConfig}
      value={formEle.config.value}
      label={formEle.config.label}
      for={formEle.id}
      changed={e => inputChangedHandler(e, formEle.id)} />
  ));

  if (props.isLoading)
    form = <Spinner />;

  return(
    <ContactDataSummary
      form="Form"
      submit={orderBurgerHandler}>
      { form }

      <Button
        disabled={!formIsValid}
        btnType="Success">
        ORDER
        <Icon size="small">attach_money</Icon>
      </Button>
    </ContactDataSummary> 
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(action.purchaseBurger(orderData, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, Axios));