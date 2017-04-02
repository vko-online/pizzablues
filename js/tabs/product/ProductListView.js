/**
 * @flow
 */
'use strict';

var F8ProductCell = require('F8ProductCell');
var Navigator = require('Navigator');
var React = require('React');
var ProductsSectionHeader = require('./ProductsSectionHeader');
var PureListView = require('../../common/PureListView');
var { groupProducts } = require('./groupProducts');
var FilterProducts = require('./filterProducts');

import type {Product } from '../../reducers/products';
import type {ProductsListData } from './groupProducts';

type Props = {
  products: Array<Product>;
  storeId?: string;
  navigator: Navigator;
  renderEmptyList?: () => ReactElement;
};

type State = {
  storeProducts: ProductsListData;
};

class ProductListView extends React.Component {
  props: Props;
  state: State;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);
    this.state = {
      storeProducts: groupProducts(FilterProducts.byStore(props.products, props.storeId)),
    };

    this._innerRef = null;

    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.products !== this.props.products) {
      this.setState({
        storeProducts: groupProducts(FilterProducts.byStore(nextProps.products, nextProps.storeId)),
      });
    }
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.storeProducts}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        {...(this.props: any /* flow can't guarantee the shape of props */)}
  renderEmptyList = { this.renderEmptyList }
  />
    );
}

renderSectionHeader(sectionData: any, sectionID: string) {
  return <ProductsSectionHeader title={sectionID} />;
}

renderRow(product: Product) {
  return (
    <F8ProductCell
      onPress={() => this.openProduct(product)}
      product={product}
      features={product.otherPrice ? ['новинка'] : null}
    />
  );
}

renderEmptyList(): ?ReactElement {
  const { renderEmptyList } = this.props;
  return renderEmptyList && renderEmptyList();
}

openProduct(product: Product) {
  this.props.navigator.push({
    product,
    allProducts: this.state.storeProducts,
  });
}

storeInnerRef(ref: ?PureListView) {
  this._innerRef = ref;
}

scrollTo(...args: Array<any>) {
  this._innerRef && this._innerRef.scrollTo(...args);
}

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

module.exports = ProductListView;
