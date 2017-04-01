/**
 * @flow
 */

'use strict';

import type { Action } from './types';

type Schedule = {[key: string]: boolean};

type Product = {[key: string]: boolean};

function applyTopicsFilter(topics: Schedule): Action {
  return {
    type: 'APPLY_TOPICS_FILTER',
    topics,
  };
}

function applyCategoriesFilter(categories: Product): Action {
  return {
    type: 'APPLY_CATEGORIES_FILTER',
    categories,
  };
}

function clearFilter(): Action {
  return {
    type: 'CLEAR_FILTER',
  };
}

module.exports = {applyTopicsFilter, clearFilter, applyCategoriesFilter};
