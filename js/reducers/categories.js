/**
 * @flow
 */

'use strict';

type State = Array<string>;
type Action = { type: string; list: Array<any>; };

function categories(state: State = [], action: Action): State {
  if (action.type === 'LOADED_PRODUCTS') {
    var categoriesMap = Object.create(null);
    action.list.forEach((product) => {
      var category = product.get('category') || [];
      categoriesMap[category] = true;
    });
    return Object.keys(categoriesMap).sort();
  }
  return state;
}

module.exports = categories;
