import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeout = expTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAFb_cxoEk3C8MhheeeNy_-mBMVw7JRb_I";

    if (!isSignup)
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAFb_cxoEk3C8MhheeeNy_-mBMVw7JRb_I";
      
    axios.post(url, authData)
      .then(res => {
        console.log(res);
        const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expDate', expDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token)
      dispatch(logout())
    else {
      const expDate = new Date(localStorage.getItem('expDate'));

      if (expDate <= new Date())
        dispatch(logout())
      else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}