/**
 * @flow
 */

'use strict';

import type {
  Action
} from '../actions/types';

export type Shipping = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export type Checkout = {
  shipping: Shipping,
  payment: string;
};

const initialState = {
  shipping: {
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  },
  payment: 'delivery',
};

function checkout(state: Checkout = initialState, action: Action): Checkout {
  switch (action.type) {
    case 'SHIPPING_ADDED':
      return { ...state, shipping: action.shipping };
    case 'PAYMENT_ADDED':
      return { ...state, payment: action.payment };
  }
  return state;
}

module.exports = checkout;
