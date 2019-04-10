import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionsTypes';

const initState = {
  orders: [],
  isLoading: false,
  purchased: false,
  isDeleted: false
};


const Failure = (state, action) => {
  return updateObject(state, {
    isLoading: false
  })
}

const Started = (state, action) => {
  return updateObject(state, {
    isLoading: true
  });
}

const purchaseInit = (state, action) => {
  return updateObject(state, {
    purchased: false
  });
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderId
  });
  return updateObject(state, {
    isLoading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    isLoading: false
  });
}

const fetchOrderDelete = (state, action) => {
  const delOrder = updateObject(action.orderDelete, {
    id: action.orderId
  })
  return updateObject(state, {
    orders: state.orders.splice(delOrder, 1),
    isDeleted: true
  })
}

const fetchOrderDeleteFail = (state, action) => {
  return updateObject(state, {
    isDeleted: false
  })
}

const confirmDelete = (state, action) => {
  return updateObject(state, {
    isDeleted: false
  })
}

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return Started(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return Failure(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return Failure(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return Started(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return Failure(state, action);
    case actionTypes.FETCH_ORDERS_DELETE:
      return fetchOrderDelete(state, action);
    case actionTypes.FETCH_ORDERS_DELETE_FAIL:
      return fetchOrderDeleteFail(state, action);
    case actionTypes.CONFIRM_DELETE:
      return confirmDelete(state, action);
    default:
      return state;
  }
}

export default orderReducer;