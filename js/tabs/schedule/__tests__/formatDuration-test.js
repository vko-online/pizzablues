/**
 * @flow
 */

'use strict';

jest.autoMockOff();
const formatDuration = require('../formatDuration');

describe('formatDuration', () => {
  it('formats duration', () => {
    expect(formatDuration(0, 3600000)).toEqual('1 hour');
    expect(formatDuration(0, 7200000)).toEqual('2 hours');
    expect(formatDuration(0, 1800000)).toEqual('30 min');
    expect(formatDuration(0, 3601000)).toEqual('1 hour 1 min');
    expect(formatDuration(0, 1427371200000)).toEqual('Until 12:00 pm');
  });
});
