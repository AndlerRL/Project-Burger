import { connect } from 'react-redux';
import { createHash } from 'crypto';
import { Redirect } from 'react-router-dom'
import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import Axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    isDeleted: true
  }

  componentDidMount() {
    //console.log(this.props)
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  confirmDeleteHandler = () => {
    this.props.onConfirmDelete();
    if (this.props.isDeleted)
      this.setState({
        isDeleted: false
      })    
  }

  render () {
    let noOrders = {
      width: '75%',
      margin: '15rem auto',
      background: '#c6ff00',
      borderBottom: '1rem solid #eeff41',
      borderTop: '1rem solid #eeff41',
      padding: '2rem',
      textAlign: 'center'
    }

    let orders = this.props.orders.map(order => (
      <Order
        ingredients={order.ingredients}
        totalPrice={order.price}
        userName={order.orderData.name}
        key={order.id}
        id={createHash('sha1').update(order.id).digest('hex')}
        delete={() => this.props.onDeleteOrder(order.id)} />
    ));

    let redirect = !this.state.isDeleted ? <Redirect to="/" /> : null;

    if (this.props.isLoading)
      orders = <Spinner />

    if (!this.props.orders.length && !this.props.isLoading)
      orders = (
        <div
          style={noOrders}
          className="z-depth-3">
          <h3>Well, there is no orders yet! You are free to do one.</h3>
        </div>
      );

    return (
      <div>
        { this.props.isDeleted ?
          <Modal
            show={this.state.isDeleted}
            modalClosed={this.confirmDeleteHandler}>
            <h2>Your order has been deleted!</h2>
          </Modal> : null }
        { redirect }
        { orders }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    isDeleted: state.order.isDeleted,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: orderId => dispatch(actions.deleteOrder(orderId)),
    onConfirmDelete: () => dispatch(actions.confirmDelete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));