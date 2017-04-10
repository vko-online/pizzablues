/**
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

export type State = {
  isLoggedIn: boolean;
  hasSkippedLogin: boolean;
  sharedBasket: ?boolean;
  id: ?string;
  name: ?string;
};

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedBasket: null,
  id: null,
  name: null,
};

function user(state: State = initialState, action: Action): State {
  if (action.type === 'LOGGED_IN') {
    let {id, name, sharedBasket} = action.data;
    if (sharedBasket === undefined) {
      sharedBasket = null;
    }
    return {
      isLoggedIn: true,
      hasSkippedLogin: false,
      sharedBasket,
      id,
      name,
    };
  }
  if (action.type === 'SKIPPED_LOGIN') {
    return {
      isLoggedIn: false,
      hasSkippedLogin: true,
      sharedBasket: null,
      id: null,
      name: null,
    };
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  if (action.type === 'SET_SHARING') {
    return {
      ...state,
      sharedBasket: action.enabled,
    };
  }
  if (action.type === 'RESET_NUXES') {
    return {...state, sharedBasket: null};
  }
  return state;
}

module.exports = user;
