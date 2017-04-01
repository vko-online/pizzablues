/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  config: require('./config'),
  notifications: require('./notifications'),
  maps: require('./maps'),
  sessions: require('./sessions'),
  user: require('./user'),
  schedule: require('./schedule'),
  topics: require('./topics'),
  categories: require('./categories'),
  filter: require('./filter'),
  navigation: require('./navigation'),
  friendsSchedules: require('./friendsSchedules'),
  surveys: require('./surveys'),
  pages: require('./pages'),
  faqs: require('./faqs'),
  stores: require('./stores'),
  products: require('./products'),
});
