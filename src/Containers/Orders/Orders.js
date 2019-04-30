import { connect } from 'react-redux';
import { createHash } from 'crypto';
import { Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import * as actions from '../../store/actions/index';
import Axios from '../../axios-orders';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Order/Order';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const orders = props => {
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, [])

  const confirmDeleteHandler = () => {
    props.onConfirmDelete();
    if (props.isDeleted)
      setDeleted(false)
  }

  let noOrders = {
    width: '75%',
    margin: '15rem auto',
    background: '#c6ff00',
    borderBottom: '1rem solid #eeff41',
    borderTop: '1rem solid #eeff41',
    padding: '2rem',
    textAlign: 'center'
  }

  let orderDel = {
    padding: '0 1rem',
    margin: '2.5rem auto',
    textAlign: 'center'
  }

  let orders = props.orders.map(order => (
    <Order
      ingredients={order.ingredients}
      totalPrice={order.price}
      userName={order.orderData.name}
      key={order.id}
      id={createHash('sha1').update(order.id).digest('hex')}
      delete={() => props.onDeleteOrder(props.token, order.id)} />
  ));

  let redirect = !deleted ? <Redirect to="/burger-builder" /> : null;

  if (props.isLoading)
    orders = <Spinner />

  if (!props.orders.length && !props.isLoading)
    orders = (
      <div
        style={noOrders}
        className="z-depth-3">
        <h3>Well, there is no orders yet! You are free to do one.</h3>
      </div>
    );

  return (
    <div>
      { props.isDeleted ?
        <Modal
          show={deleted}
          modalClosed={confirmDeleteHandler}>
          <div style={orderDel}>
            <h2>Success!</h2>
            <p>Your order has been deleted! so bad that you don't want it.</p>
            <Button
              btnType="Danger"
              clicked={confirmDeleteHandler}>
              DISMISS
            </Button>
          </div>
        </Modal> : null }
      { redirect }
      { orders }
    </div>
  );
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
    onDeleteOrder: (token, orderId) => dispatch(actions.deleteOrder(token, orderId)),
    onConfirmDelete: () => dispatch(actions.confirmDelete())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, Axios));