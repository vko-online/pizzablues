/**
 * @flow
 */

'use strict';

import type { Action} from './types';

type Tab = 'product' | 'my-basket' | 'map' | 'notifications' | 'info';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),
  switchStore: (storeId: string): Action => ({
    type: 'SWITCH_STORE',
    storeId,
  }),
};
