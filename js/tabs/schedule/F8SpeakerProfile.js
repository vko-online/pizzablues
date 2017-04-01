/**
 * @flow
 * @providesModule F8SpeakerProfile
 */

'use strict';

var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var View = require('View');

var F8SpeakerProfile = React.createClass({
  render: function () {
    var speaker = this.props.speaker;
    return (
      <View style={styles.row}>
        <Image style={styles.picture} source={{ uri: speaker.avatar }} />
        <View style={styles.info}>
          <Text style={styles.name}>{speaker.name}</Text>
          <Text style={styles.title}>{speaker.email}</Text>
        </View>
      </View>
    );
  }
});

const SIZE = 76;

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
});

module.exports = F8SpeakerProfile;
