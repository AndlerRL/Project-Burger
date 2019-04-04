import { createHash } from 'crypto';
import React, { Component } from 'react';

import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  }

  componentDidMount() {
    console.log(this.props)
    Axios.get('/orders.json')
      .then(res => {
        //console.log(res.data)
        const fetchedOrders = [];

        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        //console.log(fetchedOrders);

        this.setState({
          orders: fetchedOrders,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
      })
  }

  render () {
    let orders = this.state.orders.map(order => (
      <Order
        ingredients={order.ingredients}
        totalPrice={order.price}
        userName={order.orderData.name}
        key={order.id}
        id={createHash('sha1').update(order.id).digest('hex')} />
    ))

    if (this.state.isLoading)
      orders = <Spinner />

    return (
      <div>
        { orders }
      </div>
    );
  }
}

export default withErrorHandler(Orders, Axios);