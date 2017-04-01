/**
 * @flow
 */

'use strict';

const createParseReducer = require('./createParseReducer');

export type FAQ = {
    id: string;
    question: string;
    answer: string;
}

function fromParseFaqs(faq: Object): FAQ {
    return {
        id: faq.id,
        question: faq.get('question'),
        answer: faq.get('answer'),
    };
}

module.exports = createParseReducer('LOADED_FAQS', fromParseFaqs);
