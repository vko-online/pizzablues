/**
 * @flow
 */

'use strict';

jest.dontMock('../formatDate');
const formatDate = require('../formatDate');

describe('formatDate', () => {
    // it('formats `today`', () => {
    //     var now:Date = new Date();
    //     now.setHours(now.getHours() + 2);
    //     expect(formatDate(now.getTime())).toEqual('Today');
    // });
    // it('formats `tomorrow`', () => {
    //     var now:Date = new Date();
    //     now.setDate(now.getDate() + 1);
    //     expect(formatDate(now.getTime())).toEqual('Tomorrow');
    // });
    // it('formats `next week`', () => {
    //     var now:Date = new Date();
    //     now.setDate(now.getDate() + 7);
    //     expect(formatDate(now.getTime())).toEqual('Tomorrow');
    // });
    it('formats `in the future`', () => {
        var now:Date = new Date();
        now.setDate(now.getDate() + 123);
        expect(formatDate(now.getTime())).toEqual('In the future');
    });
});
