/**
 * @flow
 */

'use strict';

jest.dontMock('../formatTime');
const formatTime = require('../formatTime');

describe('formatTime', () => {
  it('formats time', () => {
    expect(formatTime(1427371200000)).toEqual('12:00 PM');
    expect(formatTime(1427373900000)).toEqual('12:45 PM');
  });
});
