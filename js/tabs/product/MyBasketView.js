/**
 * @flow
 */
'use strict';

var EmptyProduct = require('./EmptyProduct');
var F8Button = require('F8Button');
var FilterProducts = require('./filterProducts');
var ListContainer = require('ListContainer');
var LoginButton = require('../../common/LoginButton');
var Navigator = require('Navigator');
var ProfilePicture = require('../../common/ProfilePicture');
var React = require('React');
var PureListView = require('../../common/PureListView');
var BasketListView = require('./BasketListView');
var FriendsListView = require('./FriendsListView');

var { connect } = require('react-redux');

var {
  logOutWithPrompt,
  switchTab,
  loadFriendsBaskets
} = require('../../actions');

import type {Product } from '../../reducers/products';
import type {FriendsBaskets } from '../../reducers/friendsBaskets';
import type {State as User } from '../../reducers/user';
import type {State as Basket } from '../../reducers/basket';

var { createSelector } = require('reselect');


type Props = {
  user: User;
  basketProducts: Array<Product>;
  friends: Array<FriendsBaskets>;
  basket: Basket;
  navigator: Navigator;
  logOut: () => void;
  jumpToProducts: () => void;
  loadFriendsBaskets: () => void;
};

// TODO: Rename to MyF8View
class MyBasketView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    (this: any).renderEmptyProductsList = this.renderEmptyProductsList.bind(this);
    (this: any).openSharingSettings = this.openSharingSettings.bind(this);
    (this: any).handleSegmentChanged = this.handleSegmentChanged.bind(this);
  }

  render() {
    var rightItem;
    if (this.props.user.isLoggedIn) {
      rightItem = {
        title: 'Настройки',
        icon: require('./img/settings.png'),
        onPress: this.openSharingSettings,
      };
    }

    const { id, isLoggedIn } = this.props.user;
    const profilePicture = isLoggedIn && id
      ? <ProfilePicture userID={id} size={100} />
      : null;

    return (
      <ListContainer
        title="Избранное"
        parallaxContent={profilePicture}
        backgroundImage={require('./img/my-background.jpg')}
        backgroundColor={'#A8D769'}
        onSegmentChange={this.handleSegmentChanged}
        rightItem={rightItem}>
        {this.renderContent()}
      </ListContainer>
    );
  }

  renderContent() {
    if (!this.props.user.isLoggedIn) {
      return (
        <PureListView
          renderEmptyList={this.renderNotLoggedIn}
        />
      );
    }

    return [
      <BasketListView
        title="Мои избранные"
        key="inBasket"
        products={this.props.basketProducts}
        renderEmptyList={this.renderEmptyProductsList}
        navigator={this.props.navigator}
      />,
      <FriendsListView
        title="Избранное друзей"
        key="friendsBasket"
        friends={this.props.friends}
        navigator={this.props.navigator}
      />,
    ];
  }

  renderNotLoggedIn() {
    return (
      <EmptyProduct
        key="login"
        title="Войдите что бы добавить в корзину товары."
        text="Вы сможете сохранять корзину, делится покупками с друзьями позже">
        <LoginButton source="My Basket" />
      </EmptyProduct>
    );
  }

  renderEmptyProductsList() {
    return (
      <EmptyProduct
        key="basket"
        image={require('./img/no-sessions-added.png')}
        text={'Товары добавленные в корзину появятся тут'}>
        <F8Button
          caption={'Добавьте товары'}
          onPress={() => this.props.jumpToProducts()}
        />
      </EmptyProduct>
    );
  }

  openSharingSettings() {
    this.props.navigator.push({ shareSettings: 1 });
  }

  handleSegmentChanged(segment) {
    if (segment === 2 /* friends */) {
      this.props.loadFriendsBaskets();
    }
  }
}

const data = createSelector(
  (store) => store.products,
  (store) => store.basket,
  (products, basket) => FilterProducts.byBasketPresence(products, basket),
);

function select(store) {
  return {
    user: store.user,
    basketProducts: data(store),
    basket: store.basket,
    // Only show friends who have something in their baskets
    friends: store.friendsBaskets.filter(
      (friend) => Object.keys(friend.basket).length > 0
    ),
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt()),
    jumpToProducts: () => dispatch([
      switchTab('product'),
    ]),
    loadFriendsBaskets: () => dispatch(loadFriendsBaskets()),
  };
}

module.exports = connect(select, actions)(MyBasketView);
