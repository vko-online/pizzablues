/**
 * @flow
 */
'use strict';

import type {Session} from '../../reducers/sessions';

const formatTime = require('./formatTime');
const formatDate = require('./formatDate');

export type SessionsListData = {
  [time: string]: {
    [sessionID: string]: Session;
  };
};

function groupSessions(sessions: Array<Session>): SessionsListData {
  var data = {};
  sessions.forEach((session) => {
    var timeSectionKey = session.allDay ? 'All Day' : formatTime(session.startTime);
    data[timeSectionKey] = data[timeSectionKey] || {};
    data[timeSectionKey][session.id] = session;
  });

  return data;
}

function groupSessionsByDays(sessions: Array<Session>): SessionsListData {
  var data = {};
  sessions.forEach((session) => {
    var timeSectionKey = formatDate(session.startTime);
    data[timeSectionKey] = data[timeSectionKey] || {};
    data[timeSectionKey][session.id] = session;
  });
  return data;
}

exports.groupSessions = groupSessions;
exports.groupSessionsByDays = groupSessionsByDays;
