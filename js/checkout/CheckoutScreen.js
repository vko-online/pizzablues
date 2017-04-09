/**
 * @flow
 */
'use strict';

const React = require('react');
const {
  Text,
  View,
} = require('react-native');
const StyleSheet = require('F8StyleSheet');
const F8Header = require('F8Header');
const { connect } = require('react-redux');
// const { addPayment, addShipping } = require('../actions');

// import type {Checkout, Shipping} from '../reducers/checkout';
import type {Product } from '../reducers/products';
import type {Dispatch } from '../actions/types';

type Props = {
  checkoutProducts: Array<Product>;
  navigator: any;
  dispatch: Dispatch;
};

class CheckoutScreen extends React.Component {
  props: Props;
  state: {
    selectedIndex: number;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };

    (this: any).dismiss = this.dismiss.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <F8Header
          style={styles.header}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: require('../common/BackButtonIcon'),
            onPress: this.dismiss,
          }} />
        <Text>Checkout form</Text>
      </View>
    );
  }

  dismiss() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: '#5597B8',
    },
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    ios: {
      height: 65,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    ios: {
      borderRadius: 2,
      marginHorizontal: 3,
    },
  },
});

function select(store) {
  return {
    user: store.user
  };
}

module.exports = connect(select)(CheckoutScreen);
