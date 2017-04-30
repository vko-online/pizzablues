/**
 * @flow
 */

'use strict';

const createParseReducer = require('./createParseReducer');

export type Store = {
  id: string;
  title: string;
  shortTitle: string;
  hours: string;
  phones: string[];
  image: string;
};

function fromParseStores(store: Object): Store {
  const storeTitle = store.get('title');
  return {
    id: store.id,
    title: storeTitle,
    shortTitle: storeTitle.substring(storeTitle.indexOf('«') + 1, storeTitle.indexOf('»')),
    image: store.get('image'),
    hours: store.get('hours'),
    phones: store.get('phones'),
    enabled: store.get('enabled')
  };
}

module.exports = createParseReducer('LOADED_STORES', fromParseStores);
