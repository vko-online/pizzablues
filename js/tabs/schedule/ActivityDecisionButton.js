/**
 * @flow
 */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Animated = require('Animated');
var Dimensions = require('Dimensions');

type Props = {
  decision?: string;
  onPress: () => void;
  addedImageSource?: ?number;
  style?: any;
};

type State = {
  animGoing: Animated.Value;
  animMaybe: Animated.Value;
  animNot: Animated.Value;
};

const WILL_GO = 'Will go';
const WILL_GO_SELECTED = 'Will go';
const MAYBE = 'Maybe';
const MAYBE_SELECTED = 'Maybe';

class AddToScheduleButton extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      animGoing: new Animated.Value(props.decision === 'going' ? 1 : 0),
      animMaybe: new Animated.Value(props.decision === 'maybe' ? 1 : 0),
      animNot: new Animated.Value(props.decision === 'not' ? 1 : 0),
    };
  }

  render() {
    const addOpacityGoing = {
      opacity: this.state.animGoing.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [{
        translateY: this.state.animGoing.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 40],
        }),
      }],
    };

    const addedOpacityGoing = {
      opacity: this.state.animGoing.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: this.state.animGoing.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 0],
        }),
      }],
    };

    const addOpacityMaybe = {
      opacity: this.state.animMaybe.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [{
        translateY: this.state.animMaybe.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 40],
        }),
      }],
    };

    const addedOpacityMaybe = {
      opacity: this.state.animMaybe.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: this.state.animMaybe.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 0],
        }),
      }],
    };

    return (
      <View style={styles.containerWrapper}>
        <TouchableOpacity
          accessibilityLabel={this.props.decision === 'going' ? WILL_GO_SELECTED : WILL_GO}
          accessibilityTraits="button"
          onPress={() => this.props.onPress('going')}
          activeOpacity={0.9}
          style={[styles.container, styles.btnGoing, this.props.style]}>
          <View style={{ flex: 1 }}>
            <View style={styles.content} collapsable={false}>
              <Animated.Image
                source={require('./img/add.png')}
                style={[styles.icon, addedOpacityGoing]}
                />
              <Animated.Text style={[styles.caption, addedOpacityGoing]}>
                <Text>{WILL_GO_SELECTED.toUpperCase()}</Text>
              </Animated.Text>
            </View>
            <View style={styles.content}>
              <Animated.Text style={[styles.caption, addOpacityGoing]}>
                <Text>{WILL_GO.toUpperCase()}</Text>
              </Animated.Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={this.props.decision === 'maybe' ? MAYBE_SELECTED : MAYBE}
          accessibilityTraits="button"
          onPress={() => this.props.onPress('maybe')}
          activeOpacity={0.9}
          style={[styles.container, styles.btnMaybe, this.props.style]}>
          <View style={{ flex: 1 }}>
            <View style={styles.content} collapsable={false}>
              <Animated.Image
                source={require('./img/add.png')}
                style={[styles.icon, addedOpacityMaybe]}
                />
              <Animated.Text style={[styles.caption, addedOpacityMaybe]}>
                <Text>{MAYBE_SELECTED.toUpperCase()}</Text>
              </Animated.Text>
            </View>
            <View style={styles.content}>
              <Animated.Text style={[styles.caption, addOpacityMaybe]}>
                <Text>{MAYBE.toUpperCase()}</Text>
              </Animated.Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.decision !== nextProps.decision) {

      const toValueGoing = nextProps.decision === 'going' ? 1 : 0;
      Animated.spring(this.state.animGoing, { toValue: toValueGoing }).start();

      const toValueMaybe = nextProps.decision === 'maybe' ? 1 : 0;
      Animated.spring(this.state.animMaybe, { toValue: toValueMaybe }).start();
    }
  }
}

// <Animated.Image
//                   source={this.props.addedImageSource || require('./img/added.png')}
//                   style={[styles.icon, addedOpacityImage]}
//                   />
// <Animated.Image
//                   source={require('./img/add.png')}
//                   style={[styles.icon, addOpacityImage]}
//                   />

const HEIGHT = 50;

var styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    height: HEIGHT,
    overflow: 'hidden',
    width: (Dimensions.get('window').width / 2) - 25,
  },
  btnGoing: {
    backgroundColor: '#6A6AD5',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  btnMaybe: {
    backgroundColor: '#9cbaf9',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 40,
  },
  btnLeft: {
    borderTopLeftRadius: HEIGHT / 2,
    borderBottomLeftRadius: HEIGHT / 2,
  },
  btnMiddle: {},
  btnRight: {
    borderTopRightRadius: HEIGHT / 2,
    borderBottomRightRadius: HEIGHT / 2,
    backgroundColor: 'red'
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
    marginTop: 2,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  }
});

module.exports = AddToScheduleButton;
// $FlowFixMe
module.exports.__cards__ = (define) => {
  let f;
  setInterval(() => f && f(), 1000);

  define('Inactive', (state = true, update) =>
    <AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);

  define('Active', (state = false, update) =>
    <AddToScheduleButton isAdded={state} onPress={() => update(!state)} />);

  define('Animated', (state = false, update) => {
    f = () => update(!state);
    return <AddToScheduleButton isAdded={state} onPress={() => { } } />;
  });
};
