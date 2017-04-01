/**
 * @flow
 */
'use strict';

var EmptySchedule = require('./EmptySchedule');
var FilterHeader = require('./FilterHeader');
var FilterSessions = require('./filterSessions');
var ListContainer = require('ListContainer');
var Navigator = require('Navigator');
var React = require('React');
var Platform = require('Platform');
var F8DrawerLayout = require('F8DrawerLayout');
var ScheduleListView = require('./ScheduleListView');
var FriendsListView = require('./FriendsListView');
var FilterScreen = require('../../filter/FilterScreen');

var { connect } = require('react-redux');

import type {Session } from '../../reducers/sessions';

// TODO: Move from reselect to memoize?
var { createSelector } = require('reselect');

const data = createSelector(
  (store) => store.sessions,
  (store) => store.filter,
  (sessions, filter) => FilterSessions.byTopics(sessions, filter),
);

type Props = {
  filter: any;
  sessions: Array<Session>;
  navigator: Navigator;
  logOut: () => void;
};

class GeneralScheduleView extends React.Component {
  props: Props;
  _drawer: ?F8DrawerLayout;

  constructor(props) {
    super(props);

    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).openFilterScreen = this.openFilterScreen.bind(this);
    (this: any).openCreateScreen = this.openCreateScreen.bind(this);
    (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    (this: any).renderContent = this.renderContent.bind(this);
  }

  render() {
    const filterItem = {
      icon: require('../../common/img/filter.png'),
      title: 'Filter',
      onPress: this.openFilterScreen,
    };

    // const createItem = {
    //   icon: require('../../common/img/filter.png'),
    //   title: 'Create',
    //   onPress: this.openCreateScreen,
    // };

    const filterHeader = Object.keys(this.props.filter).length > 0
      ? <FilterHeader />
      : null;

    const content = (
      <ListContainer
        title="Меню"
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor="#5597B8"
        selectedSectionColor="#51CDDA"
        stickyHeader={filterHeader}
        leftItem={filterItem}>
        {this.renderContent()}
      </ListContainer>
    );

    if (Platform.OS === 'ios') {
      return content;
    }
    return (
      <F8DrawerLayout
        ref={(drawer) => { this._drawer = drawer; } }
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}>
        {content}
      </F8DrawerLayout>
    );
  }

  renderContent() {
    return [
      <ScheduleListView
        title="Пицца Блюз"
        key="goingTab"
        sessions={this.props.sessions}
        renderEmptyList={this.renderEmptyList}
        navigator={this.props.navigator}
        />,
      <ScheduleListView
        title="Масленица"
        key="maybeTab"
        sessions={this.props.sessions}
        renderEmptyList={this.renderEmptyList}
        navigator={this.props.navigator}
        />,
      <ScheduleListView
        title="Теплица"
        key="maybeTab2"
        sessions={this.props.sessions}
        renderEmptyList={this.renderEmptyList}
        navigator={this.props.navigator}
        />,
    ];
  }
  renderNavigationView() {
    return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()} />;
  }

  renderEmptyList() {
    return (
      <EmptySchedule
        title={'No sessions match the filter'}
        text="Check the schedule for the other day or remove the filter."
        />
    );
  }

  openFilterScreen() {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({ filter: 123 });
    } else {
      this._drawer && this._drawer.openDrawer();
    }
  }

  openCreateScreen() {
    this.props.navigator.push({ create: 123 });
  }
}

function select(store) {
  return {
    filter: store.filter,
    sessions: data(store),
  };
}

module.exports = connect(select)(GeneralScheduleView);
