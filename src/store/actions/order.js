import * as actionTypes from './actionsTypes';
import Axios from '../../axios-orders';
import { createHash } from 'crypto';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}
export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    Axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data)
        dispatch(purchaseBurgerSuccess(createHash('sha1').update(res.data.name).digest('hex'), orderData));
      })
      .catch(err => {
        console.error(err)
        dispatch(purchaseBurgerFail(err));
      });
  }
}
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}
export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}
export const fetchOrdersDelete = orderId => {
  return {
    type: actionTypes.FETCH_ORDERS_DELETE,
    orders: orderId
  }
}
export const fetchOrdersDeleteFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_DELETE_FAIL,
    error: error
  }
}
export const confirmDelete = () => {
  return {
    type: actionTypes.CONFIRM_DELETE 
  }
}
export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
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
          dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
          dispatch(fetchOrdersFail(err));
        })
  }
}
export const deleteOrder = orderId => {
  return dispatch => {
    Axios.delete(`/orders/${orderId}.json`)
      .then(res => {
        console.log(res);
        dispatch(fetchOrdersDelete(orderId));
      })
      .catch(err => {
        dispatch(fetchOrdersDeleteFail(err));
      })
  }
}