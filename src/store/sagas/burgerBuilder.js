import { put } from 'redux-saga/effects';
import Axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga(action) {
  try {
    const response = yield Axios.get('/Ingredients.json')
    yield put(actions.setIngredients(response.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed())
  }
}