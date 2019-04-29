import { delay, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expData');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAFb_cxoEk3C8MhheeeNy_-mBMVw7JRb_I";

  if (!action.isSignup)
    url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAFb_cxoEk3C8MhheeeNy_-mBMVw7JRb_I";
  
  try {
    const response = yield axios.post(url, authData)
    const expDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
  
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expDate', expDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');

    if (!token)
      yield put(actions.logout())
    else {
      const expDate = yield new Date(localStorage.getItem('expDate'));

    if (expDate <= new Date())
      yield put(actions.logout());
    else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}