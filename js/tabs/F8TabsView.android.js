/**
 * @flow
 * @providesModule F8TabsView
 */

'use strict';

var F8InfoView = require('F8InfoView');
var F8Colors = require('F8Colors');
// var F8MapView = require('F8MapView');
var F8NotificationsView = require('F8NotificationsView');
var React = require('React');
var Navigator = require('Navigator');
var F8DrawerLayout = require('F8DrawerLayout');
var View = require('View');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var Image = require('Image');
var {Text} = require('F8Text');
var MenuItem = require('./MenuItem');
var LoginButton = require('../common/LoginButton');
var ProfilePicture = require('../common/ProfilePicture');
var GeneralProductView = require('./product/GeneralProductView');
var MyBasketView = require('./product/MyBasketView');
var unseenNotificationsCount = require('./notifications/unseenNotificationsCount');

var {switchTab, logOutWithPrompt} = require('../actions');
var {connect} = require('react-redux');

import type {Tab} from '../reducers/navigation';

class F8TabsView extends React.Component {
  props: {
    tab: Tab,
    onTabSelect: (tab: Tab) => void,
    navigator: Navigator,
  };

  constructor(props) {
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
      hasUnreadNotifications: this.props.notificationsBadge > 0,
    };
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  openProfileSettings() {
    this.refs.drawer.closeDrawer();
    this.props.navigator.push({shareSettings: true});
  }

  renderNavigationView() {
    var productMenuIcon = this.props.day === 1
      ? require('./product/img/schedule-icon-1.png')
      : require('./product/img/schedule-icon-2.png');
    var productMenuIconSelected = this.props.day === 1
      ? require('./product/img/schedule-icon-1-active.png')
      : require('./product/img/schedule-icon-2-active.png');
    var accountItem, myF8Item, loginItem;

    if (this.props.user.isLoggedIn) {
      var name = this.props.user.name || '';
      accountItem = (
        <View>
          <TouchableOpacity onPress={this.openProfileSettings}>
            <ProfilePicture userID={this.props.user.id} size={80} />
          </TouchableOpacity>
          <Text style={styles.name}>
            {name.toUpperCase()}
          </Text>
        </View>
      );
      myF8Item = (
        <MenuItem
          title="My Basket"
          selected={this.props.tab === 'my-basket'}
          onPress={this.onTabSelect.bind(this, 'my-basket')}
          icon={require('./product/img/my-schedule-icon.png')}
          selectedIcon={require('./product/img/my-schedule-icon-active.png')}
        />
      );
    } else {
      accountItem = (
        <View>
          <Image source={require('./img/logo.png')} />
          <Text style={styles.name}>
            APRIL 12 + 13 / SAN FRANCISCO
          </Text>
        </View>
      );
      loginItem = (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>
            Log in to find your friends at F8.
          </Text>
          <LoginButton source="Drawer" />
        </View>
      );
    }
    return (
      <View style={styles.drawer}>
        <Image
          style={styles.header}
          source={require('./img/drawer-header.png')}
        >
          {accountItem}
        </Image>
        <MenuItem
          title="Products"
          selected={this.props.tab === 'product'}
          onPress={this.onTabSelect.bind(this, 'product')}
          icon={productMenuIcon}
          selectedIcon={productMenuIconSelected}
        />
        {myF8Item}
        {/*<MenuItem
          title="Maps"
          selected={this.props.tab === 'map'}
          onPress={this.onTabSelect.bind(this, 'map')}
          icon={require('./maps/img/maps-icon.png')}
          selectedIcon={require('./maps/img/maps-icon-active.png')}
        />*/}
        {/*<MenuItem
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          badge={this.props.notificationsBadge}
          icon={require('./notifications/img/notifications-icon.png')}
          selectedIcon={require('./notifications/img/notifications-icon-active.png')}
        />
        <MenuItem
          title="Info"
          selected={this.props.tab === 'info'}
          onPress={this.onTabSelect.bind(this, 'info')}
          icon={require('./info/img/info-icon.png')}
          selectedIcon={require('./info/img/info-icon-active.png')}
        />*/}
        {loginItem}
      </View>
    );
  }

  renderContent() {
    switch (this.props.tab) {
      case 'product':
        return <GeneralProductView navigator={this.props.navigator} />;
      case 'my-basket':
        return (
          <MyBasketView
            navigator={this.props.navigator}
            onJumpToProduct={() => this.props.onTabSelect('product')}
          />
        );

      // case 'map':
      //   return <F8MapView />;

      case 'notifications':
        return <F8NotificationsView navigator={this.props.navigator} />;

      case 'info':
        return <F8InfoView navigator={this.props.navigator} />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  render() {
    return (
      <F8DrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </F8DrawerLayout>
    );
  }
}

F8TabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
  hasUnreadNotifications: React.PropTypes.number,
};

function select(store) {
  return {
    tab: store.navigation.tab,
    user: store.user,
    notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: tab => dispatch(switchTab(tab)),
    logOut: () => dispatch(logOutWithPrompt()),
  };
}

var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  loginText: {
    fontSize: 12,
    color: F8Colors.lightText,
    textAlign: 'center',
    marginBottom: 10,
  },
});

module.exports = connect(select, actions)(F8TabsView);
