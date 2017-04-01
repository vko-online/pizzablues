/**
 * @flow
 */

'use strict';

const createParseReducer = require('./createParseReducer');

export type Creator = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  facebook_id: string;
  username: string;
};

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
  creator: Creator
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
    creator: {
      // id: session.get('creator') ? session.get('creator').get('id') : '',
      // name: session.get('creator') ? session.get('creator').get('name') : '',
      // email: session.get('creator') ? session.get('creator').get('email') : '',
      // facebook_id: session.get('creator') ? session.get('creator').get('facebook_id') : '',
      // username: session.get('creator') ? session.get('creator').get('username') : '',
      // avatar: session.get('creator') ? `http://graph.facebook.com/${session.get('creator').get('facebook_id')}/picture?width=60&height=60` : ''
    },
  };
}

module.exports = createParseReducer('LOADED_SESSIONS', fromParseSessions);