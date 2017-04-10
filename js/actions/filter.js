/**
 * @flow
 */

'use strict';

import type { Action } from './types';

type Product = {[key: string]: boolean};

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

module.exports = {clearFilter, applyCategoriesFilter};
