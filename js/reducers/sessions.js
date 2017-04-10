/**
 * @flow
 */

'use strict';

const createParseReducer = require('./createParseReducer');

export type Session = {
  id: string;
  title: string;
  description: string;
  hasDetails: boolean;
  slug: string;
  onMySchedule: boolean;
  tags: Array < string > ;
  startTime: number;
  endTime: number;
  map: ? string;
  location: ? string;
};

function fromParseSessions(session: Object): Session {
  return {
    id: session.id,
    title: session.get('sessionTitle'),
    description: session.get('sessionDescription'),
    hasDetails: session.get('hasDetails'),
    slug: session.get('sessionSlug'),
    onMySchedule: session.get('onMySchedule'),
    tags: session.get('tags') || [],
    startTime: session.get('startTime') && session.get('startTime').getTime(),
    endTime: session.get('endTime') && session.get('endTime').getTime(),
    map: session.get('sessionMap') && session.get('sessionMap').url(),
    location: session.get('sessionLocation'),
  };
}

module.exports = createParseReducer('LOADED_SESSIONS', fromParseSessions);
