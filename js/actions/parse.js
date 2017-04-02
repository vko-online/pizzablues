/**
 * @flow
 */

'use strict';

const Parse = require('parse/react-native');
const logError = require('logError');
const InteractionManager = require('InteractionManager');

import type { ThunkAction } from './types';

const Maps = Parse.Object.extend('Maps');
const Page = Parse.Object.extend('Page');
const FAQ = Parse.Object.extend('FAQ');
const Notification = Parse.Object.extend('Notification');
const Product = Parse.Object.extend('Product');
const Store = Parse.Object.extend('Store');


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
  loadSessions: (): ThunkAction =>
    loadParseQuery(
      'LOADED_SESSIONS',
      new Parse.Query('Agenda')
        .include('speakers')
        .ascending('startTime')
    ),
  loadFaqs: (): ThunkAction =>
    loadParseQuery('LOADED_FAQS', new Parse.Query(FAQ)),
  loadPages: (): ThunkAction =>
    loadParseQuery('LOADED_PAGES', new Parse.Query(Page)),
  loadMaps: (): ThunkAction =>
    loadParseQuery('LOADED_MAPS', new Parse.Query(Maps)),

  loadNotifications: (): ThunkAction =>
    loadParseQuery('LOADED_NOTIFICATIONS', new Parse.Query(Notification)),
  loadProducts: (): ThunkAction =>
    loadParseQuery('LOADED_PRODUCTS', new Parse.Query(Product).include('store')),
  loadStores: (): ThunkAction =>
    loadParseQuery('LOADED_STORES', new Parse.Query(Store)),
};
