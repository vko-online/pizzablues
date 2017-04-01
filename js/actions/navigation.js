/**
 * @flow
 */

'use strict';

import type { Action } from './types';

type Tab = 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),

  switchDecision: (decision: 'going' | 'maybe'): Action => ({
    type: 'SWITCH_DECISION',
    decision,
  }),
};
