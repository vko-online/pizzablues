/**
 * @flow
 */

'use strict';

const Parse = require('parse/react-native');
const logError = require('logError');
const InteractionManager = require('InteractionManager');
const async = require('async');

import type { ThunkAction } from './types';

const Maps = Parse.Object.extend('Maps');
const Page = Parse.Object.extend('Page');
const Faq = Parse.Object.extend('Faq');
const Notification = Parse.Object.extend('Notification');
const Product = Parse.Object.extend('Product');
const Store = Parse.Object.extend('Store');
// const Comment = Parse.Object.extend('Comment');

function loadParseQuery(type: string, query: Parse.Query): ThunkAction {
  return (dispatch) => {
    return query.find({
      success: (list) => {
        // We don't want data loading to interfere with smooth animations
        InteractionManager.runAfterInteractions(() => {
          // Flow can't guarantee {type, list} is a valid action
          dispatch(({ type, list }: any));
      });
  },
    error: logError,
    });
  };
}

module.exports = {
  loadFaqs: (): ThunkAction =>
    loadParseQuery('LOADED_FAQS', new Parse.Query(Faq)),
  loadPages: (): ThunkAction =>
    loadParseQuery('LOADED_PAGES', new Parse.Query(Page)),
  loadMaps: (): ThunkAction =>
    loadParseQuery('LOADED_MAPS', new Parse.Query(Maps)),
  loadNotifications: (): ThunkAction =>
    loadParseQuery('LOADED_NOTIFICATIONS', new Parse.Query(Notification)),
  loadProducts: (): ThunkAction =>  {
    // loadParseQuery('LOADED_PRODUCTS', new Parse.Query(Product).include('store').include('comments'));
    return (dispatch) => {
      return new Parse.Query(Product).include('store').find({
        success: (list) => {
          async.each(list, (item, cb) => {
            Parse.Promise.when(item.relation('comments').query().find()).then(comments => {
              item.comments = comments.map(c => {
                return {
                  id: c.id,
                  text: c.get('text'),
                  userId: c.get('userId'),
                  displayName: c.get('displayName'),
                  updatedAt: c.get('updatedAt'),
                };
              });
              cb();
            });
          }, () => {
              InteractionManager.runAfterInteractions(() => {
                dispatch(({ type: 'LOADED_PRODUCTS', list }: any));
              });
          });
        },
        error: logError,
      });
    };
  },
  loadStores: (): ThunkAction =>
    loadParseQuery('LOADED_STORES', new Parse.Query(Store).equalTo('enabled', true)),
};
