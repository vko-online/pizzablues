/**
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

export type State = {
  [id: string]: string;
};

function schedule(state: State = {}, action: Action): State {
  switch (action.type) {
    case 'SESSION_ADDED':
      let added = {};
      added[action.id] = action.value;
      return {...state, ...added};

    case 'SESSION_REMOVED':
      let rest = {...state};
      delete rest[action.id];
      return rest;

    case 'LOGGED_OUT':
      return {};

    case 'RESTORED_SCHEDULE':
      let all = {};
      action.list.forEach((session) => {
        all[session.id] = session.value;
      });
      return all;
  }
  return state;
}

module.exports = schedule;
