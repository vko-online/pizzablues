/**
 * @flow
 */

'use strict';

jest.dontMock('../schedule');
const schedule = require('../schedule');

describe('schedule reducer', () => {

  it('is empty by default', () => {
    expect(schedule(undefined, ({}: any))).toEqual({});
});

it('adds sessions to schedule', () => {
  expect(
    schedule({}, { type: 'SESSION_ADDED', id: 'one', value: 'going' })
  ).toEqual({ one: 'going' });

  expect(
    schedule({ one: 'going' }, { type: 'SESSION_ADDED', id: 'two', value: 'maybe' })
  ).toEqual({ one: 'going', two: 'maybe' });
});

it('removes sessions from schedule', () => {
  expect(
    schedule({
      one: 'going',
      two: 'maybe',
    }, {
        type: 'SESSION_REMOVED',
        id: 'two',
      })
  ).toEqual({
    one: 'going',
  });
});

it('restores schedule when logging in', () => {
  expect(
    schedule({
      one: 'going'
    }, {
        type: 'RESTORED_SCHEDULE',
        list: [{ id: 'two', value: 'maybe' }, { id: 'three', value: 'maybe' }],
      })
  ).toEqual({
    two: 'maybe',
    three: 'maybe',
  });
});

it('clears schedule when logging out', () => {
  expect(
    schedule({
      one: 'going',
      two: 'maybe',
    }, {
        type: 'LOGGED_OUT',
      })
  ).toEqual({});
});

});
