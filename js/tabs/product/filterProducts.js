/**
 * @flow
 */
'use strict';

import type {
  Product
} from '../../reducers/products';

type StringMap = {
  [key: string]: boolean
};

function byCategory(products: Array<Product>, categories: StringMap): Array<Product> {
  if (Object.keys(categories).length === 0) {
    return products;
  }
  return products.filter(product => categories[product.category]);
}

function byStore(products: Array<Product>, storeId?: string): Array<Product> {
  if (!storeId) {
    return products;
  }
  return products.filter(product => product.store.title === storeId);
}

function byBasketPresence(products: Array<Product>, basket: StringMap): Array<Product> {
  if (Object.keys(basket).length === 0) {
    return [];
  }
  return products.filter(product => !!basket[product.id]);
}

module.exports = {
  byCategory,
  byStore,
  byBasketPresence
};
