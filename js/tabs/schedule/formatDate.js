/**
 * @flow
 */
'use strict';

function formatDate(date: number): string {
    var now = Date.now();
    var diff = Math.floor((date - now) / 86400000);
    if (diff > 0 && diff < 1) {
        return 'Today';
    }
    else if (diff === 1) {
        return 'Tomorrow';
    }
    else if (diff > 1 && diff < 7) {
        return 'Next week';
    }
    else {
        return 'In the future';
    }
}

module.exports = formatDate;
