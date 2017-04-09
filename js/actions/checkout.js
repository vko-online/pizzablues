const Parse = require('parse/react-native');

import type { ThunkAction } from './types';
import type { Shipping } from '../reducers/checkout';

function addShipping(shipping: Shipping): ThunkAction {
  return (dispatch) => {
    dispatch({
      type: 'SHIPPING_ADDED',
      shipping,
    });
    Parse.User.current().set('shipping', shipping);
    Parse.User.current().save();
  };
}

function addPayment(payment: string) {
  return {
    type: 'PAYMENT_ADDED',
    payment,
  };
}

function proceedCheckout() {
  alert('todo(medet): not implemented');
  // todo
}

module.exports = {
  addPayment,
  addShipping,
  proceedCheckout
};
