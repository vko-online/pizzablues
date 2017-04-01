/**
 * @flow
 */

'use strict';

import type {Action } from '../actions/types';

export type FormData = {
    sessionTitle: string;
    sessionDescription: string;
    sessionPrivate: boolean;
    startTime: Date;
    sessionPrice: string;
    pricePerUser: boolean;
};

type State = {
    canSubmit: boolean;
    data: FormData;
};

function form(state: State = {}, action: Action): State {
    if (action.type === 'LOGGED_OUT') {
        return {};
    }
    if (action.type === 'FORM_SUBMITTED') {
        return {};
    }
    if (action.type === 'FORM_INPUT') {
        return { ...state, data: action.value, canSubmit: !!action.value.sessionTitle };
    }
    return state;
}

module.exports = form;
