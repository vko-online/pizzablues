/**
 * @flow
 */

'use strict';

var F8Colors = require('F8Colors');
var React = require('React');
var Image = require('Image');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableHighlight = require('TouchableHighlight');
var View = require('View');
var ProfilePicture = require('../../common/ProfilePicture');

import type {FriendsBaskets} from '../../reducers/friendsBaskets';

class FriendCell extends React.Component {
  props: {
    friend: FriendsBaskets;
    onPress: ?() => void;
  };

  render() {
    const {friend} = this.props;
    const hasBasket = friend.basket && Object.keys(friend.basket).length > 0;
    const auxView = hasBasket
      ? <Image source={require('../../common/img/disclosure.png')} />
      : <Text style={styles.private}>PRIVATE</Text>;

    const cell = (
      <View style={styles.cell}>
        <ProfilePicture userID={friend.id} size={42} />
        <Text style={styles.name}>
          {friend.name}
        </Text>
        {auxView}
      </View>
    );

    if (!hasBasket) {
      return cell;
    }
    return (
      <TouchableHighlight underlayColor="#3C5EAE" onPress={this.props.onPress}>
        {cell}
      </TouchableHighlight>
    );
  }
}


var styles = StyleSheet.create({
  cell: {
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 17,
    marginHorizontal: 10,
    color: F8Colors.darkText,
  },
  private: {
    color: F8Colors.lightText,
  }
});

module.exports = FriendCell;
