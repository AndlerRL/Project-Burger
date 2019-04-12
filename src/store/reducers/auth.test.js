import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
  it('should return the initState', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      isLoading: false,
      authRedirectPath: '/burger-builder'
    })
  })

  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      isLoading: false,
      authRedirectPath: '/burger-builder'
    },{
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      isLoading: false,
      authRedirectPath: '/burger-builder'
    })
  })
})