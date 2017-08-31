/**
 * @flow
 */

'use strict';

const parseActions = require('./parse');
const navigationActions = require('./navigation');
const loginActions = require('./login');
const filterActions = require('./filter');
const notificationActions = require('./notifications');
const configActions = require('./config');
const surveyActions = require('./surveys');
const testActions = require('./test');
const installationActions = require('./installation');
const basketActions = require('./basket');
const checkoutActions = require('./checkout');
const commentActions = require('./comment');

module.exports = {
  ...loginActions,
  ...filterActions,
  ...notificationActions,
  ...configActions,
  ...surveyActions,
  ...testActions,
  ...parseActions,
  ...navigationActions,
  ...installationActions,
  ...basketActions,
  ...checkoutActions,
  ...commentActions,
};
