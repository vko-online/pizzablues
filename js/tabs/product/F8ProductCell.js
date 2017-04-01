/**
 * @providesModule F8ProductCell
 * @flow
 */

'use strict';

var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var F8Touchable = require('F8Touchable');
var View = require('View');
var Dimensions = require('Dimensions');
var { connect } = require('react-redux');

import type {Product } from '../../reducers/products';

class F8ProductCell extends React.Component {
  props: {
    product: Product;
    showTick: boolean;
    showStartEndTime: boolean;
    onPress: ?() => void;
    style: any;
  };

  render() {
    var product = this.props.product;
    var tick;
    if (this.props.showTick) {
      tick =
        <Image style={styles.added} source={require('./img/added-cell.png')} />;
    }
    // var time;
    // if (this.props.showStartEndTime) {
    //   time = formatTime(product.startTime) + ' - ' + formatTime(product.endTime);
    // } else {
    //   time = formatDuration(product.startTime, product.endTime);
    // }
    var cell =
      <View style={[styles.cell, this.props.style]}>
        <Image
          style={styles.img}
          source={{ uri: product.image }} />
        <View style={styles.lane}>
          <View style={styles.titleSection}>
            <Text numberOfLines={2} style={styles.titleText}>
              {product.title}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.duration}>
            <Text style={styles.locationText}>
              {product.price}
            </Text>
            {product.price && ' - '}
            {product.otherPrice}
          </Text>
        </View>
        {tick}
      </View>;

    if (this.props.onPress) {
      cell =
        <F8Touchable onPress={this.props.onPress}>
          {cell}
        </F8Touchable>;
    }

    return cell;
  }
}


var styles = StyleSheet.create({
  cell: {
    paddingVertical: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSection: {
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAndDuration: {
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 17,
    // lineHeight: 24,
    color: F8Colors.darkText,
    marginBottom: 4,
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: F8Colors.lightText,
  },
  locationText: {
    fontSize: 12,
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
  img: {
    borderRadius: 10,
    width: 60,
    height: 60,
    marginRight: 10,
  },
  lane: {
    width: Dimensions.get('window').width - 70,
  },
});

function select(store, props) {
  return {
    showTick: !!store.schedule[props.product.id],
  };
}

module.exports = connect(select)(F8ProductCell);
