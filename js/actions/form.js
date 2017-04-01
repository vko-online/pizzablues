/**
 * @flow
 */

'use strict';
const Parse = require('parse/react-native');
const {currentInstallation, updateInstallation} = require('./installation');
const Agenda = Parse.Object.extend('Agenda');

import type { Action, ThunkAction, Dispatch } from './types';
import type {FormData } from '../reducers/form';

function formInput(value: any): Action {
    return {
        type: 'FORM_INPUT',
        value
    };
}

function submitForm(value: FormData): ThunkAction {
    delete value.showStartTimePicker;
    return (dispatch: Dispatch) => {
        if (Parse.User.current()) {
            var newAgenda = new Agenda();
            newAgenda.save({
                ...value,
                creator: Parse.User.current(),
                onMySchedule: true,
                hasDetails: !!value.sessionLocation,
                sessionSlug: value.sessionTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            }).then((dbAgenda) => {
                Parse.User.current().relation('mySchedule').add({ id: dbAgenda.id });
                Parse.User.current().save();
                currentInstallation().then((installation) => {
                    installation.addUnique('channels', `session_${dbAgenda.id}`);
                    return installation.save();
                });
                dispatch({
                    type: 'SESSION_ADDED',
                    id: dbAgenda.id,
                    value: 'going',
                });
            });
            dispatch({
                type: 'FORM_SUBMITTED',
            });
        }
    };
}

module.exports = { formInput, submitForm };
