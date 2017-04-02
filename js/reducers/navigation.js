/**
 * @flow
 */

'use strict';

import type {Action } from '../actions/types';

export type Tab =
  'product'
  | 'my-basket'
  | 'map'
  | 'notifications'
  | 'info'
  ;

export type Decision = 'going' | 'maybe';
export type Store = string;

type State = {
  tab: Tab;
  decision: Decision;
};

const initialState: State = { tab: 'product', decision: 'going', storeId: 'Кафе «Пицца Блюз», ул. М. Горького, 56' };

function navigation(state: State = initialState, action: Action): State {
  if (action.type === 'SWITCH_TAB') {
    return { ...state, tab: action.tab };
  }
  if (action.type === 'SWITCH_DECISION') {
    return { ...state, day: action.decision };
  }
  if (action.type === 'SWITCH_STORE') {
    return { ...state, storeId: action.storeId };
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = navigation;
