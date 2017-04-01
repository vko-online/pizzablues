/**
 * @flow
 */

'use strict';

var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var View = require('View');

var StoreView = React.createClass({
  render: function () {
    var store = this.props.store;
    return (
      <View style={styles.row}>
        <Image style={styles.picture} source={{ uri: store.image }} />
        <View style={styles.info}>
          <Text style={styles.name}>{store.title}</Text>
          <Text style={styles.title}>{store.hours}</Text>
          {
            store.phones.map(phone => <Text style={styles.phone}>{phone}</Text>)
          }
        </View>
      </View>
    );
  }
});

const SIZE = 50;

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: 14,
    alignItems: 'center',
  },
  picture: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  info: {
    paddingLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 15,
    marginBottom: 2,
    color: F8Colors.darkText,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    color: F8Colors.darkText,
  },
  phone: {
    fontSize: 12,
    lineHeight: 16,
    color: F8Colors.lightText,
  },
});

module.exports = StoreView;
