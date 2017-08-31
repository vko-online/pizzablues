/**
 * @flow
 */

'use strict';

type ParseObject = Object;

export type Action =
  { type: 'LOADED_ABOUT', list: Array<ParseObject> }
  | { type: 'LOADED_NOTIFICATIONS', list: Array<ParseObject> }
  | { type: 'LOADED_MAPS', list: Array<ParseObject> }
  | { type: 'NEW_COMMENT', productId: string; text: string; }
  | { type: 'COMMENT_ADDED', comment: ParseObject; }
  | { type: 'COMMENT_ADDING', }
  | { type: 'LOADED_FRIENDS_BASKETS', list: Array<{ id: string; name: string; basket: { [key: string]: boolean }; }> }
  | { type: 'LOADED_CONFIG', config: ParseObject }
  | { type: 'LOADED_PAGES', list: Array<ParseObject> }
  | { type: 'LOADED_FAQS', list: Array<ParseObject> }
  | { type: 'LOADED_SURVEYS', list: Array<Object> }
  | { type: 'SUBMITTED_SURVEY_ANSWERS', id: string; }
  | { type: 'LOGGED_IN', source: ?string; data: { id: string; name: string; sharedBasket: ?boolean; } }
  | { type: 'RESTORED_BASKET', list: Array<ParseObject> }
  | { type: 'SKIPPED_LOGIN' }
  | { type: 'LOGGED_OUT' }
  | { type: 'FORM_SUBMITTED' }
  | { type: 'PRODUCT_ADDED', id: string }
  | { type: 'PRODUCT_REMOVED', id: string }
  | { type: 'SET_SHARING', enabled: boolean }
  | { type: 'APPLY_TOPICS_FILTER', topics: { [key: string]: boolean } }
  | { type: 'APPLY_CATEGORIES_FILTER', categories: { [key: string]: boolean } }
  | { type: 'CLEAR_FILTER' }
  | { type: 'SWITCH_STORE', storeId: string }
  | { type: 'SWITCH_TAB', tab: 'product' | 'my-basket' | 'map' | 'notifications' | 'info' }
  | { type: 'TURNED_ON_PUSH_NOTIFICATIONS' }
  | { type: 'REGISTERED_PUSH_NOTIFICATIONS' }
  | { type: 'SKIPPED_PUSH_NOTIFICATIONS' }
  | { type: 'RECEIVED_PUSH_NOTIFICATION', notification: Object }
  | { type: 'SHIPPING_ADDED', shipping: { firstName: string; lastName: string; phone: string; address: string; } }
  | { type: 'PAYMENT_ADDED', payment: string }
  | { type: 'SEEN_ALL_NOTIFICATIONS' }
  | { type: 'RESET_NUXES' }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
