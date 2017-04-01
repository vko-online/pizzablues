/**
 * @providesModule F8App
 * @flow
 */

'use strict';

var React = require('React');
var AppState = require('AppState');
var LoginScreen = require('./login/LoginScreen');
var PushNotificationsController = require('./PushNotificationsController');
var StyleSheet = require('StyleSheet');
var F8Navigator = require('F8Navigator');
var CodePush = require('react-native-code-push');
var View = require('View');
var StatusBar = require('StatusBar');
var {
  loadConfig,
  loadMaps,
  loadNotifications,
  loadSessions,
  loadFriendsSchedules,
  loadSurveys,
  loadPages,
  loadFaqs,
  loadStores,
  loadProducts,
} = require('./actions');
var { updateInstallation } = require('./actions/installation');
var { connect } = require('react-redux');

var { version } = require('./env.js');

var F8App = React.createClass({
  componentDidMount: function () {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadNotifications());
    this.props.dispatch(loadMaps());
    this.props.dispatch(loadConfig());
    this.props.dispatch(loadSessions());
    this.props.dispatch(loadFriendsSchedules());
    this.props.dispatch(loadSurveys());
    this.props.dispatch(loadPages());
    this.props.dispatch(loadFaqs());
    this.props.dispatch(loadStores());
    this.props.dispatch(loadProducts());

    updateInstallation({ version });
    CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
  },

  componentWillUnmount: function () {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function (appState) {
    if (appState === 'active') {
      this.props.dispatch(loadSessions());
      this.props.dispatch(loadNotifications());
      this.props.dispatch(loadSurveys());
      CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESUME });
    }
  },

  render: function () {
    if (!this.props.isLoggedIn) {
      return <LoginScreen />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="black"
          />
        <F8Navigator />
        <PushNotificationsController />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(F8App);
