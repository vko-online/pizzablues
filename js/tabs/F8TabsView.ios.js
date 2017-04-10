/**
 * @flow
 * @providesModule F8TabsView
 */

'use strict';

var F8Colors = require('F8Colors');
// var F8InfoView = require('F8InfoView');
// var F8NotificationsView = require('F8NotificationsView');
var GeneralProductView = require('./product/GeneralProductView');
var MyBasketView = require('./product/MyBasketView');
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var Navigator = require('Navigator');
var unseenNotificationsCount = require('./notifications/unseenNotificationsCount');

var { switchTab } = require('../actions');
var { connect } = require('react-redux');

import type {Tab} from '../reducers/navigation';

class F8TabsView extends React.Component {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigator: Navigator;
  };

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {
    return (
      <TabBarIOS tintColor={F8Colors.darkText}>
        <TabBarItemIOS
          title="Меню"
          selected={this.props.tab === 'product'}
          onPress={this.onTabSelect.bind(this, 'product')}
          icon={require('./product/img/schedule-icon-1.png')}
          selectedIcon={require('./product/img/schedule-icon-1-active.png')}>
          <GeneralProductView
            navigator={this.props.navigator}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Корзина"
          selected={this.props.tab === 'my-basket'}
          onPress={this.onTabSelect.bind(this, 'my-basket')}
          icon={require('./product/img/my-schedule-icon.png')}
          selectedIcon={require('./product/img/my-schedule-icon-active.png')}>
          <MyBasketView
            navigator={this.props.navigator}
            onJumpToProduct={() => this.props.onTabSelect('product')}
          />
        </TabBarItemIOS>
        {/*<TabBarItemIOS
          title="Акции"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          badge={this.props.notificationsBadge || null}
          icon={require('./notifications/img/notifications-icon.png')}
          selectedIcon={require('./notifications/img/notifications-icon-active.png')}>
          <F8NotificationsView navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Информация"
          selected={this.props.tab === 'info'}
          onPress={this.onTabSelect.bind(this, 'info')}
          icon={require('./info/img/info-icon.png')}
          selectedIcon={require('./info/img/info-icon-active.png')}>
          <F8InfoView navigator={this.props.navigator} />
        </TabBarItemIOS>*/}
      </TabBarIOS>
    );
  }

}

function select(store) {
  return {
    tab: store.navigation.tab,
    notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(F8TabsView);
