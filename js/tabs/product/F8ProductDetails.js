/**
 * @flow
 * @providesModule F8ProductDetails
 */

'use strict';

var Animated = require('Animated');
var F8Colors = require('F8Colors');
var Image = require('Image');
import LinearGradient from 'react-native-linear-gradient';
var StoreView = require('../../common/StoreView');
var PixelRatio = require('PixelRatio');
var React = require('React');
var ScrollView = require('ScrollView');
var StyleSheet = require('StyleSheet');
var Subscribable = require('Subscribable');
var Dimensions = require('Dimensions');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var AddToBasketButton = require('./AddToBasketButton');
var ImageModalView = require('../../common/ImageModalView');
var { connect } = require('react-redux');
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
import ImageZoom from 'react-native-image-pan-zoom';

var {
  addToBasket,
  removeFromBasketWithPrompt,
} = require('../../actions');

var F8ProductDetails = React.createClass({
  mixins: [Subscribable.Mixin],

  getInitialState: function () {
    return {
      scrollTop: new Animated.Value(0),
    };
  },

  toggleAdded: function (value) {
    if (!this.props.isAddedToBasket) {
      this.addToBasket();
    } else {
      this.props.removeFromBasketWithPrompt();
    }
  },
  addToBasket: function () {
    if (!this.props.isLoggedIn) {
      this.props.navigator.push({
        login: true,
        callback: () => this.addToBasket(),
      });
    } else {
      this.props.addToBasket();
      if (this.props.sharedBasket === null) {
        setTimeout(() => this.props.navigator.push({ share: true }), 1000);
      }
    }
  },

  render: function () {
    /*var locationColor = F8Colors.darkText;
    var locationTitle = this.props.product.title.toUpperCase();;
    var location = (
      <Text style={[styles.location, {color: locationColor}]}>
        {locationTitle}
        <Text style={styles.time}>
          {locationTitle && ' - '}
          {this.props.product.price}
        </Text>
      </Text>
    );*/

    var titleHeader = (
      <View>
        <Text style={styles.titlePrice}>
          {this.props.product.price}
        </Text>
        <Text style={styles.time}>
          {this.props.product.otherPrice}
        </Text>
      </View>
    );
    // var productImage = <Image style={styles.picture} source={{ uri: this.props.product.image }} />;
    /*var productImage = (
      <ImageZoom cropWidth={WIDTH}
        cropHeight={HEIGHT}
        imageWidth={WIDTH - 76}
        imageHeight={WIDTH - 76}>
        <Image style={styles.picture}
          source={{ uri: this.props.product.image }} />
      </ImageZoom>
    );*/
    /*<Image
          style={styles.pictureBig}
          source={{ uri: this.props.product.image }} />*/

    const modalElementImage = <Image style={styles.picture} source={{ uri: this.props.product.image }} />;
    var productImage = (
      <ImageModalView handleStyle={styles.picture} handleElement={modalElementImage}>
        <ImageZoom cropWidth={WIDTH}
          cropHeight={HEIGHT}
          imageWidth={WIDTH}
          imageHeight={HEIGHT}>
          <Image style={styles.pictureBig}
            source={{ uri: this.props.product.image }} />
        </ImageZoom>
      </ImageModalView>
    );

    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          onScroll={({ nativeEvent }) => this.state.scrollTop.setValue(nativeEvent.contentOffset.y)}
          scrollEventThrottle={100}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}>
          <Text style={styles.title}>
            {this.props.product.title}
          </Text>
          <View style={styles.pictureWrapper}>
            {productImage}
          </View>
          <Text style={styles.description}>
            {this.props.product.description}
          </Text>
          <Section>
            {titleHeader}
          </Section>
          <StoreView store={this.props.product.store} />
          <TouchableOpacity
            accessibilityLabel="Поделится продуктом"
            accessibilityTraits="button"
            onPress={this.props.onShare}
            style={styles.shareButton}>
            <Image source={require('./img/share.png')} />
          </TouchableOpacity>

          <Section>
            <AddToBasketButton
              isAdded={this.props.isAddedToBasket}
              onPress={this.toggleAdded} />
          </Section>
        </ScrollView>
        <Animated.View style={[
          styles.miniHeader,
          {
            opacity: this.state.scrollTop.interpolate({
              inputRange: [0, 150, 200],
              outputRange: [0, 0, 1],
              extrapolate: 'clamp',
            })
          }
        ]}>
          <Text numberOfLines={1} style={styles.miniTitle}>
            {this.props.product.title}
            <Text style={styles.time}>
              {this.props.product.title && ' - '}
              {this.props.product.price}
            </Text>
          </Text>
        </Animated.View>
      </View>
    );
  },
});

class Section extends React.Component {
  props: {
    title?: string;
    children?: any;
  };

  render() {
    var { children } = this.props;
    if (React.Children.count(children) === 0) {
      return null;
    }
    var header;
    if (this.props.title) {
      header = (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {this.props.title.toUpperCase()}
          </Text>
          <LinearGradient
            start={[0, 0]} end={[1, 0]}
            colors={['#E1E1E1', 'white']}
            style={styles.line}
          />
        </View>
      );
    }
    return (
      <View style={styles.section}>
        {header}
        {children}
      </View>
    );
  }
}

var PADDING = 15;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 26,
    paddingBottom: 60,
  },
  pictureWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  picture: {
    width: WIDTH - 76,
    height: WIDTH - 76,
    borderRadius: 10,
  },
  pictureBig: {
    width: WIDTH,
    height: WIDTH,
  },
  miniHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 12,
    top: 0,
    right: 12,
    paddingVertical: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#E1E1E1',
  },
  miniTitle: {
    fontSize: 12,
    flex: 1,
    color: F8Colors.darkText,
  },
  titlePrice: {
    fontSize: 14,
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
  time: {
    color: F8Colors.lightText,
    marginBottom: 20,
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
  },
  topics: {
    fontSize: 12,
    color: F8Colors.lightText,
  },
  section: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    color: F8Colors.lightText,
    marginRight: 14,
    fontSize: 12,
  },
  line: {
    height: 1 / PixelRatio.get(),
    backgroundColor: F8Colors.lightText,
    flex: 1,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    margin: 10,
    paddingVertical: 10,
    borderTopColor: '#eeeeee',
    backgroundColor: 'white',
  },
  shareButton: {
    backgroundColor: 'transparent',
    padding: PADDING,
    position: 'absolute',
    right: 0,
    top: 0,
  }
});

function select(store, props) {
  const productID = props.product.id;
  const friendsGoing = store.friendsBaskets.filter((friend) => friend.basket[productID]);

  return {
    isAddedToBasket: !!store.basket[props.product.id],
    isLoggedIn: store.user.isLoggedIn,
    sharedBasket: store.user.sharedBasket,
    productURLTemplate: store.config.productURLTemplate,
    categories: store.categories,
    friendsGoing,
  };
}

function actions(dispatch, props) {
  let id = props.product.id;
  return {
    addToBasket: (value) => dispatch(addToBasket(id)),
    removeFromBasketWithPrompt:
    () => dispatch(removeFromBasketWithPrompt(props.product)),
  };
}

module.exports = connect(select, actions)(F8ProductDetails);
