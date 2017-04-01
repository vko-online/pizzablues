/**
 * @providesModule F8SessionCell
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
var moment = require('moment');
var { connect } = require('react-redux');

import type {Session } from '../../reducers/sessions';

class F8SessionCell extends React.Component {
  props: {
    session: Session;
    showTick: boolean;
    showStartEndTime: boolean;
    onPress: ?() => void;
    style: any;
  };

  render() {
    var session = this.props.session;
    var tick;
    if (this.props.showTick) {
      tick =
        <Image style={styles.added} source={require('./img/added-cell.png')} />;
    }
    // var time;
    // if (this.props.showStartEndTime) {
    //   time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
    // } else {
    //   time = formatDuration(session.startTime, session.endTime);
    // }
    var location = session.location && session.location.toUpperCase();
    var locationColor = F8Colors.colorForLocation(location);
    var cell =
      <View style={[styles.cell, this.props.style]}>
        <Image
          style={styles.img}
          source={{ uri: session.creator.avatar }} />
        <View style={styles.lane}>
          <View style={styles.titleSection}>
            <Text numberOfLines={2} style={styles.titleText}>
              {session.title}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.duration}>
            <Text style={[styles.locationText, { color: locationColor }]}>
              {location}
            </Text>
            {location && ' - '}
            {moment(session.startTime).format('HH:MM, dddd, Do MMMM')}
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
    showTick: !!store.schedule[props.session.id],
  };
}

module.exports = connect(select)(F8SessionCell);
