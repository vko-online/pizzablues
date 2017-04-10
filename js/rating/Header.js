/**
 * @flow
 */
'use strict';

const React = require('react');
const F8Colors = require('F8Colors');
const {
  Image,
  Text,
  View,
  StyleSheet,
} = require('react-native');

import type {Product} from '../reducers/products';

type Props = {
  product: Product,
};

function Header({product}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require('./img/header.png')} />
      </View>
      <Text style={styles.title}>
        {product.title}
      </Text>
      <View style={styles.store}>
        <Image source={{uri: product.store.image}} style={styles.pic} />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    paddingHorizontal: 10,
  },
  background: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 12,
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  store: {
    marginTop: 15,
    flexDirection: 'row',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 2,
  },
});

module.exports = Header;
module.exports.__cards__ = define => {
  const MOCK_PRODUCT = {
    id: 'mock1',
    title: 'Building For the Next Billion',
    store: {
      id: '2',
      title: 'Bar',
      image: 'https://graph.facebook.com/10152531777042364/picture?width=60&height=60',
    },
    description: '...',
    slug: 'next-billion',
  };

  define('Example', (state = null, update) => (
    <Header product={MOCK_PRODUCT} />
  ));

  define('Long title', () => (
    <Header
      product={{
        ...MOCK_PRODUCT,
        title: "Inside Facebook's Infrastructure (Part 1): The System that Serves Billions",
        store: {
          image: 'https://graph.facebook.com/10152531777042364/picture?width=60&height=60',
        },
      }}
    />
  ));
};
