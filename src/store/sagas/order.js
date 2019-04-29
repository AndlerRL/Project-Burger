import { put } from 'redux-saga/effects';
import Axios from '../../axios-orders';
import { createHash } from 'crypto';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield Axios.post('/orders.json?auth=' + action.token, action.orderData)
    yield put(actions.purchaseBurgerSuccess(createHash('sha1').update(response.data.name).digest('hex'), action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  try {
    const response = yield Axios.get('/orders.json' + queryParams)    
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}

export function* deleteOrderSaga(action) {
  try {
    yield Axios.delete(`/orders/${action.orderId}.json?auth=${action.token}`);
    yield put(actions.fetchOrdersDelete(action.orderId));
  } catch (err) {
    yield put(actions.fetchOrdersDeleteFail(err));
  }
}