import React, { Component } from 'react';
import Axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import ContactDataSummary from '../../../components/Order/CheckoutSummary/ContactDataSummary/ContactDataSummary';

class ContactData extends Component {
  state = {
    name: '',
    address: {
      street: '',
      zipCode: '',
      state: '',
      country: ''
    },
    email: '',
    isLoading: false
  }

  componentDidMount() {
    console.log(this.props);
  }

  orderBurgerHandler = e => {
    e.preventDefault();
    //console.log(this.props.ingredients);

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      //On a real app, the price should be recalculated on the server, so user cannot manipulate it
      customer: {
        name: 'Robert Lucas',
        address: {
          street: '1300 Tuxedo rd',
          zipCode: '10109',
          state: 'Texas',
          country: 'United States'
        },
        email: 'test@test.uk'
      },
      deliveryMethod: 'ASAP'
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

  cancelBurgerHandler = () => {
    
  }

  render () {
    let form = (
      <ContactDataSummary 
        orderBurger={this.orderBurgerHandler}
        orderCancel={this.calcelBurgerHandler} />
    );

    if (this.state.isLoading)
      form = <Spinner />;

    return(
      form 
    );
  }
}

export default ContactData;