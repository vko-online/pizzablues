/**
 * @flow
 */
'use strict';

var Navigator = require('Navigator');
var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var EmptyProduct = require('./EmptyProduct');
var FilterProducts = require('./filterProducts');
var ListContainer = require('ListContainer');
var ProductListView = require('./ProductListView');

var { connect } = require('react-redux');

import type {Product } from '../../reducers/products';
import type {FriendsBaskets } from '../../reducers/friendsBaskets';

var { createSelector } = require('reselect');

type Props = {
  products: Array<Product>;
  friend: FriendsBaskets;
  navigator: Navigator;
};

class FriendsBasketView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
  }

  render() {
    const backItem = {
      icon: require('../../common/img/back_white.png'),
      onPress: () => this.props.navigator.pop(),
    };
    const firstName = this.props.friend.name.split(' ')[0];
    return (
      <ListContainer
        title={`Список избранных ${firstName}`}
        parallaxContent={<ProfilePicture userID={this.props.friend.id} size={100} />}
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor={'#5597B8'}
        selectedSectionColor="#51CDDA"
        leftItem={backItem}>
        <ProductListView
          title="История покупок"
          products={this.props.products}
          renderEmptyList={this.renderEmptyList}
          navigator={this.props.navigator}
        />
      </ListContainer>
    );
  }

  renderEmptyList() {
    return (
      <EmptyProduct
        title="Нет данных"
        text={`${this.props.friend.name}  еще не добавил товары в избранное`}
      />
    );
  }
}

const data = createSelector(
  (store) => store.products,
  (store, props) => props.friend.basket,
  (products, basket) => FilterProducts.byBasketPresence(products, basket),
);

function select(store, props) {
  return {
    products: data(store, props),
  };
}

module.exports = connect(select)(FriendsBasketView);
