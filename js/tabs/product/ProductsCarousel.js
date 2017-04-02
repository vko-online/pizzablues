/**
 * @flow
 */
'use strict';

const Parse = require('parse/react-native');
const { AppEventsLogger } = require('react-native-fbsdk');
const React = require('react');
const F8ProductDetails = require('F8ProductDetails');
const F8PageControl = require('F8PageControl');
const F8Header = require('F8Header');
const StyleSheet = require('F8StyleSheet');
const Platform = require('Platform');
const Carousel = require('../../common/Carousel');

const { connect } = require('react-redux');
const { shareProduct, loadFriendsBaskets } = require('../../actions');

import type {Dispatch } from '../../actions/types';

const {
  Text,
  View,
  Navigator,
} = require('react-native');

import type {Product } from '../../reducers/products';

type Context = {
  rowIndex: number; // TODO: IndexWithinSection
  sectionLength: number;
  sectionTitle: string;
};

type Props = {
  allProducts?: { [sectionID: string]: { [productID: string]: Product } };
  product: Product;
  navigator: Navigator;
  dispatch: Dispatch;
};

class ProductsCarusel extends React.Component {
  props: Props;
  state: {
    category: string;
    count: number;
    selectedIndex: number;
    flatProductsList: Array<Product>;
    contexts: Array<Context>;
  };

  constructor(props: Props) {
    super(props);

    var flatProductsList = [];
    var contexts: Array<Context> = [];
    var allProducts = this.props.allProducts;
    if (!allProducts) {
      const { product } = this.props;
      allProducts = {
        [product.category]: { [product.id]: product }
      };
    }

    // TODO: Add test
    for (let sectionID in allProducts) {
      const sectionLength = Object.keys(allProducts[sectionID]).length;
      let rowIndex = 0;
      for (let productID in allProducts[sectionID]) {
        const product = allProducts[sectionID][productID];
        flatProductsList.push(product);
        contexts.push({
          rowIndex,
          sectionLength,
          sectionTitle: sectionID,
        });
        rowIndex++;
      }
    }

    const selectedIndex = flatProductsList.findIndex((s) => s.id === this.props.product.id);
    if (selectedIndex === -1) {
      // console.log(this.props.product);
      // console.log(flatProductsList);
    }

    this.state = {
      category: this.props.product.category,
      count: flatProductsList.length,
      selectedIndex,
      flatProductsList,
      contexts,
    };
    (this: any).dismiss = this.dismiss.bind(this);
    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    (this: any).renderCard = this.renderCard.bind(this);
    (this: any).shareCurrentProduct = this.shareCurrentProduct.bind(this);
  }

  render() {
    var { rowIndex, sectionLength, sectionTitle } = this.state.contexts[this.state.selectedIndex];
    var rightItem;
    if (Platform.OS === 'android') {
      rightItem = {
        title: 'Поделиться',
        icon: require('./img/share.png'),
        onPress: this.shareCurrentProduct,
      };
    }
    return (
      <View style={styles.container}>
        <F8Header
          style={styles.header}
          leftItem={{
            layout: 'icon',
            title: 'Закрыть',
            icon: require('../../common/BackButtonIcon'),
            onPress: this.dismiss,
          }}
          rightItem={rightItem}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              <Text style={styles.when}>{sectionTitle}</Text>
            </Text>
            <F8PageControl
              count={sectionLength}
              selectedIndex={rowIndex}
            />
          </View>
        </F8Header>
        <Carousel
          count={this.state.count}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  renderCard(index: number): ReactElement {
    return (
      <F8ProductDetails
        key={index}
        style={styles.card}
        navigator={this.props.navigator}
        product={this.state.flatProductsList[index]}
        onShare={this.shareCurrentProduct}
      />
    );
  }

  shareCurrentProduct() {
    const product = this.state.flatProductsList[this.state.selectedIndex];
    this.props.dispatch(shareProduct(product));
  }

  componentDidMount() {
    this.track(this.state.selectedIndex);
    this.props.dispatch(loadFriendsBaskets());
  }

  dismiss() {
    this.props.navigator.pop();
  }

  handleIndexChange(selectedIndex: number) {
    this.track(selectedIndex);
    this.setState({ selectedIndex });
  }

  track(index: number) {
    const { id } = this.state.flatProductsList[index];
    Parse.Analytics.track('view', { id });
    AppEventsLogger.logEvent('View Product', 1, { id });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    android: {
      backgroundColor: 'red', //5597B8
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
    fontSize: 12,
    ios: {
      textAlign: 'center',
    },
  },
  when: {
    ios: {
      fontWeight: 'bold',
    },
    android: {
      fontSize: 9,
    },
  },
  time: {
    android: {
      fontWeight: 'bold',
      fontSize: 17,
    }
  },
  card: {
    ios: {
      borderRadius: 2,
      marginHorizontal: 3,
    },
  },
});

module.exports = connect()(ProductsCarusel);
