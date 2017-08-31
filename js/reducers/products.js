/**
 * @flow
 */

'use strict';
import type {
  Store
} from './stores';

const createParseReducer = require('./createParseReducer');

export type Comment = {
  id: string;
  userId: string;
  displayName: string;
  updatedAt: Date;
  text: string;
}

export type Product = {
  id: string;
  title: string;
  slug?: string;
  image: string;
  description: string;
  price: string;
  otherPrice: string;
  category: string;
  store: Store;
  comments: Comment[];
};

function slug(title: string) {
  return title.replace('', '');
}

function fromParseProducts(product: Object): Product {
  // console.log('product.get', product.get('comments'), product.get('comments').toJSON());
  return {
    id: product.id,
    title: product.get('title'),
    slug: slug(product.get('title')),
    image: product.get('image'),
    description: product.get('description'),
    price: product.get('price'),
    otherPrice: product.get('otherPrice'),
    category: product.get('category'),
    store: {
      id: product.get('store') ? product.get('store').id : '',
      title: product.get('store') ? product.get('store').get('title') : '',
      shortTitle: product.get('store') ? product.get('store').get('title').substring(product.get('store').get('title').indexOf('«') + 1, product.get('store').get('title').indexOf('»')) : '',
      hours: product.get('store') ? product.get('store').get('hours') : '',
      image: product.get('store') ? product.get('store').get('image') : '',
      phones: product.get('store') ? product.get('store').get('phones') : [],
      enabled: product.get('store') ? product.get('store').get('enabled') : false,
    },
    comments: product.comments,
  };
}

module.exports = createParseReducer('LOADED_PRODUCTS', fromParseProducts);
