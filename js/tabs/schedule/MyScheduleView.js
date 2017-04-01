/**
 * @flow
 */
'use strict';

var EmptySchedule = require('./EmptySchedule');
var F8Button = require('F8Button');
var FilterSessions = require('./filterSessions');
var ListContainer = require('ListContainer');
var LoginButton = require('../../common/LoginButton');
var Navigator = require('Navigator');
var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var PureListView = require('../../common/PureListView');
var ScheduleListView = require('./ScheduleListView');
var FriendsListView = require('./FriendsListView');

var { connect } = require('react-redux');

var {
  logOutWithPrompt,
  switchTab,
  switchDecision,
  loadFriendsSchedules,
} = require('../../actions');

import type {Session } from '../../reducers/sessions';
import type {FriendsSchedule } from '../../reducers/friendsSchedules';
import type {State as User } from '../../reducers/user';
import type {State as Schedule } from '../../reducers/schedule';

var { createSelector } = require('reselect');


type Props = {
  user: User;
  sessions: { [key: string]: Array<Session> };
  friends: Array<FriendsSchedule>;
  schedule: Schedule;
  navigator: Navigator;
  logOut: () => void;
  jumpToSchedule: (decision: string) => void;
  loadFriendsSchedules: () => void;
};

// TODO: Rename to MyF8View
class MyScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    (this: any).renderEmptySessionsList = this.renderEmptySessionsList.bind(this);
    (this: any).openSharingSettings = this.openSharingSettings.bind(this);
    (this: any).handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }

  render() {
    var rightItem;
    if (this.props.user.isLoggedIn) {
      rightItem = {
        title: 'Settings',
        icon: require('./img/settings.png'),
        onPress: this.openSharingSettings,
      };
    }

    const {id, isLoggedIn} = this.props.user;
    const profilePicture = isLoggedIn && id
      ? <ProfilePicture userID={id} size={100} />
      : null;

    return (
      <ListContainer
        title="My Activities"
        parallaxContent={profilePicture}
        backgroundImage={require('./img/my-f8-background.png')}
        backgroundColor={'#A8D769'}
        onSegmentChange={this.handleSegmentChanged}
        rightItem={rightItem}>
        {this.renderContent()}
      </ListContainer>
    );
  }

  renderContent() {
    if (!this.props.user.isLoggedIn) {
      return (
        <PureListView
          renderEmptyList={this.renderNotLoggedIn}
          />
      );
    }

    return [
      <ScheduleListView
        title="Пицца Блюз"
        key="goingTab"
        sessions={this.props.sessions.going}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
        />,
      <ScheduleListView
        title="Масленица"
        key="maybeTab"
        sessions={this.props.sessions.maybe}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
        />,
      <FriendsListView
        title="Теплица"
        key="friendsTab"
        friends={this.props.friends}
        navigator={this.props.navigator}
        />,
        <ScheduleListView
        title="Жаровня"
        key="goingTab2"
        sessions={this.props.sessions.going}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
        />,
      <ScheduleListView
        title="Тракриръ"
        key="maybeTab3"
        sessions={this.props.sessions.maybe}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
        />,
        <ScheduleListView
        title="Imbeer"
        key="maybeTab5"
        sessions={this.props.sessions.maybe}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
        />,
        <ScheduleListView
        title="barBQ"
        key="maybeTab7"
        sessions={this.props.sessions.maybe}
        renderEmptyList={this.renderEmptySessionsList}
        navigator={this.props.navigator}
        />,
    ];
  }

  renderNotLoggedIn() {
    return (
      <EmptySchedule
        key="login"
        title="Log in to make a schedule."
        text="You’ll be able to save sessions to your schedule to view or share later.">
        <LoginButton source="My F8" />
      </EmptySchedule>
    );
  }

  renderEmptySessionsList(decision: string) {
    return (
      <EmptySchedule
        key="schedule"
        image={require('./img/no-sessions-added.png')}
        text={'Sessions you save will\nappear here.'}>
        <F8Button
          caption={`See the ${decision} schedule`}
          onPress={() => this.props.jumpToSchedule(decision)}
          />
      </EmptySchedule>
    );
  }

  openSharingSettings() {
    this.props.navigator.push({ shareSettings: 1 });
  }

  handleSegmentChanged(segment) {
    if (segment === 2 /* friends */) {
      this.props.loadFriendsSchedules();
    }
  }
}

const data = createSelector(
  (store) => store.sessions,
  (store) => store.schedule,
  (sessions, schedule) => FilterSessions.byDecision(sessions, schedule),
);

function select(store) {
  return {
    user: store.user,
    sessions: data(store),
    schedule: store.schedule,
    // Only show friends who have something in their schedule
    friends: store.friendsSchedules.filter(
      (friend) => Object.keys(friend.schedule).length > 0
    ),
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt()),
    jumpToSchedule: (decision) => dispatch([
      switchTab('schedule'),
      switchDecision(decision),
    ]),
    loadFriendsSchedules: () => dispatch(loadFriendsSchedules()),
  };
}

module.exports = connect(select, actions)(MyScheduleView);
