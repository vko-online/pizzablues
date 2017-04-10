/**
 * @flow
 */

'use strict';

jest.dontMock('../basket');
const basket = require('../basket');

describe('basket reducer', () => {

  it('is empty by default', () => {
    expect(basket(undefined, ({}: any))).toEqual({});
});

it('adds products to basket', () => {
  expect(
    basket({}, { type: 'PRODUCT_ADDED', id: 'one' })
  ).toEqual({ one: true });

  expect(
    basket({ one: true }, { type: 'PRODUCT_ADDED', id: 'two'})
  ).toEqual({ one: true, two: true });
});

it('removes products from basket', () => {
  expect(
    basket({
      one: true,
      two: true,
    }, {
        type: 'PRODUCT_REMOVED',
        id: 'two',
      })
  ).toEqual({
    one: true,
  });
});

it('restores basket when logging in', () => {
  expect(
    basket({
      one: true
    }, {
        type: 'RESTORED_BASKET',
        list: [{ id: 'two'}, { id: 'three'}],
      })
  ).toEqual({
    two: true,
    three: true,
  });
});

it('clears basket when logging out', () => {
  expect(
    basket({
      one: true,
      two: true,
    }, {
        type: 'LOGGED_OUT',
      })
  ).toEqual({});
});

});
