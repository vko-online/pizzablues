/**
 * @flow
 */

'use strict';

const createParseReducer = require('./createParseReducer');

export type Page = {
    id: string;
    alias: string;
    logo: string;
    title: string;
}

function fromParsePages(page: Object): Page {
    return {
        id: page.id,
        alias: page.get('alias'),
        logo: page.get('logo') && page.get('logo').url(),
        title: page.get('title'),
    };
}

module.exports = createParseReducer('LOADED_PAGES', fromParsePages);
