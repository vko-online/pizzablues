/**
 * @flow
 */

'use strict';

var Image = require('Image');
import LinearGradient from 'react-native-linear-gradient';
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');

type Props = {
  onPress: () => void;
  addedImageSource?: ?number;
  style?: any;
};

const CHECKOUT_LABEL = 'Заказать';

class CheckoutButton extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const colors = ['#4DC7A4', '#66D37A'];
    return (
      <TouchableOpacity
        accessibilityLabel={CHECKOUT_LABEL}
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.9}
        style={[styles.container, this.props.style]}>
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={colors}
          collapsable={false}
          style={styles.button}>
          <View style={{ flex: 1 }}>
            <View style={styles.content}>
              <Image
                source={require('./img/add.png')}
                style={styles.icon} />
              <Text style={styles.caption}>
                {CHECKOUT_LABEL.toUpperCase()}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: HEIGHT,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    marginHorizontal: 40,
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
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

module.exports = CheckoutButton;
// $FlowFixMe
module.exports.__cards__ = (define) => {
  let f;
  setInterval(() => f && f(), 1000);

  define('Inactive', (state = true, update) =>
    <CheckoutButton onPress={() => update(!state)} />);

  define('Active', (state = false, update) =>
    <CheckoutButton onPress={() => update(!state)} />);
};
