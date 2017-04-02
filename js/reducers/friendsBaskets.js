/**
 * @flow
 */

'use strict';

import type {Action} from '../actions/types';

export type FriendsBaskets = {
  id: string;
  name: string;
  basket: {[key: string]: boolean};
};

type State = Array<FriendsBaskets>;

function friendsBaskets(state: State = [], action: Action): State {
  if (action.type === 'LOADED_FRIENDS_BASKETS') {
    return action.list;
  }
  if (action.type === 'LOGGED_OUT') {
    return [];
  }
  return state;
}

module.exports = friendsBaskets;
