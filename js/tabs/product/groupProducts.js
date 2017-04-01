/**
 * @flow
 */
'use strict';

import type {Product} from '../../reducers/products';

export type ProductsListData = {
  [time: string]: {
    [productID: string]: Product;
  };
};

function groupProducts(products: Array<Product>): ProductsListData {
  var data = {};
  products.forEach((product) => {
    data[product.category] = data[product.category] || {};
    data[product.category][product.id] = product;
  });

  return data;
}

exports.groupProducts = groupProducts;
