/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  config: require('./config'),
  notifications: require('./notifications'),
  maps: require('./maps'),
  user: require('./user'),
  topics: require('./topics'),
  categories: require('./categories'),
  filter: require('./filter'),
  navigation: require('./navigation'),
  friendsBaskets: require('./friendsBaskets'),
  surveys: require('./surveys'),
  pages: require('./pages'),
  faqs: require('./faqs'),
  stores: require('./stores'),
  products: require('./products'),
  basket: require('./basket'),
});
