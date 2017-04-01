/**
 * @flow
 */
'use strict';

var EmptyProduct = require('./EmptyProduct');
var FilterHeader = require('./FilterHeader');
var FilterProducts = require('./filterProducts');
var ListContainer = require('ListContainer');
var Navigator = require('Navigator');
var React = require('React');
var Platform = require('Platform');
var F8DrawerLayout = require('F8DrawerLayout');
var ProductListView = require('./ProductListView');
var FilterScreen = require('../../filter/FilterScreen');

var { connect } = require('react-redux');
var {switchStore} = require('../../actions');

import type {Product, Store } from '../../reducers/products';

// TODO: Move from reselect to memoize?
var { createSelector } = require('reselect');

const data = createSelector(
  (store) => store.products,
  (store) => store.filter,
  (products, filter) => FilterProducts.byCategory(products, filter),
);

type Props = {
  filter: any;
  storeId: string;
  products: Array<Product>;
  stores: Array<Store>;
  navigator: Navigator;
  logOut: () => void;
  switchStore: (storeId: string) => void;
};

class GeneralProductView extends React.Component {
  props: Props;
  _drawer: ?F8DrawerLayout;

  constructor(props) {
    super(props);

    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).openFilterScreen = this.openFilterScreen.bind(this);
    (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    (this: any).renderContent = this.renderContent.bind(this);
    (this: any).switchStore = this.switchStore.bind(this);
  }

  render() {
    console.log('storeId', this.props.storeId);
    const filterItem = {
      icon: require('../../common/img/filter.png'),
      title: 'Filter',
      onPress: this.openFilterScreen,
    };

    let selectedIndex;
    this.props.stores.forEach((store, index) => {
      if (store === this.props.storeId) {
        selectedIndex = index;
        return;
      }
    })

    const filterHeader = Object.keys(this.props.filter).length > 0
      ? <FilterHeader />
      : null;

    const content = (
      <ListContainer
        title="Меню"
        selectedSegment={selectedIndex}
        onSegmentChange={this.switchStore}
        backgroundImage={require('./img/schedule-background.png')}
        backgroundColor="#5597B8"
        selectedSectionColor="#51CDDA"
        stickyHeader={filterHeader}
        leftItem={filterItem}>
        {this.renderContent()}
      </ListContainer>
    );

    if (Platform.OS === 'ios') {
      return content;
    }
    return (
      <F8DrawerLayout
        ref={(drawer) => { this._drawer = drawer; }}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}>
        {content}
      </F8DrawerLayout>
    );
  }

  renderContent() {
    return this.props.stores.map(store => {
      return (
        <ProductListView
          title={store.shortTitle}
          key={store.shortTitle}
          storeId={store.title}
          products={this.props.products}
          renderEmptyList={this.renderEmptyList}
          navigator={this.props.navigator}
        />
      );
    });
  }
  renderNavigationView() {
    return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()} />;
  }

  renderEmptyList() {
    return (
      <EmptyProduct
        title={'No products match the filter'}
        text="Remove the filters."
      />
    );
  }

  openFilterScreen() {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({ filter: 123 });
    } else {
      this._drawer && this._drawer.openDrawer();
    }
  }

  switchStore(index:number) {
    this.props.switchStore(this.props.stores[index].title);
  }
}

function select(store) {
  return {
    storeId: store.navigation.storeId,
    filter: store.filter,
    products: data(store),
    stores: store.stores
  };
}

function actions(dispatch) {
  return {
    switchStore: (storeId:string) => dispatch(switchStore(storeId)),
  };
}

module.exports = connect(select, actions)(GeneralProductView);
