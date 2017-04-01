/**
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

export type Tab =
    'schedule'
  | 'my-schedule'
  | 'map'
  | 'notifications'
  | 'info'
  ;

export type Decision = 'going' | 'maybe';

type State = {
  tab: Tab;
  decision: Decision;
};

const initialState: State = { tab: 'schedule', decision: 'going' };

function navigation(state: State = initialState, action: Action): State {
  if (action.type === 'SWITCH_TAB') {
    return {...state, tab: action.tab};
  }
  if (action.type === 'SWITCH_DECISION') {
    return {...state, day: action.decision};
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = navigation;
