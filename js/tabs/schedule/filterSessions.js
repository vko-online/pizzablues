/**
 * @flow
 */
'use strict';

import type {Session } from '../../reducers/sessions';

type StringMap = { [key: string]: boolean };
type StringMapAny = { [key: string]: any };
type SessionList = { [key: string]: Array<Session> }

function byTopics(sessions: Array<Session>, topics: StringMap): Array<Session> {
  if (Object.keys(topics).length === 0) {
    return sessions;
  }
  return sessions.filter((session) => {
    var hasMatchingTag = false;
    session.tags.forEach((tag) => {
      hasMatchingTag = hasMatchingTag || topics[tag];
    });
    return hasMatchingTag;
  });
}

function bySchedule(sessions: Array<Session>, schedule: StringMap): Array<Session> {
  return sessions.filter(
    (session) => schedule[session.id]
  );
}

function byDecision(sessions: Array<Session>, schedule: StringMapAny): SessionList {
  return {
    'going': sessions.filter(session => schedule[session.id] === 'going'),
    'maybe': sessions.filter(session => schedule[session.id] === 'maybe'),
  };
}

module.exports = { byTopics, bySchedule, byDecision };
