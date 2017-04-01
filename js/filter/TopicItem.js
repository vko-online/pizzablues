/**
 * @flow
 */

'use strict';

var React = require('react');
var {
  StyleSheet,
  View,
  TouchableOpacity,
} = require('react-native');
var { Text } = require('F8Text');

class TopicItem extends React.Component {
  props: {
    topic: string;
    color: string;
    isChecked: boolean;
    onToggle: (value: boolean) => void;
  };

  render() {
    const {topic, color, isChecked, onToggle} = this.props;
    const style = isChecked
      ? {backgroundColor: color}
      : {borderColor: color, borderWidth: 1};
    const accessibilityTraits = ['button'];
    if (isChecked) {
      accessibilityTraits.push('selected');
    }
    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        style={styles.container}
        onPress={onToggle}>
        <View style={[styles.checkbox, style]} />
        <Text style={styles.title}>
          {topic}
        </Text>
      </TouchableOpacity>
    );
  }
}

const SIZE = 24;

var styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: 'white',
    flex: 1,
  },
});

module.exports = TopicItem;
