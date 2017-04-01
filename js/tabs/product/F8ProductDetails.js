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

var { connect } = require('react-redux');

var F8ProductDetails = React.createClass({
  mixins: [Subscribable.Mixin],

  getInitialState: function () {
    return {
      scrollTop: new Animated.Value(0),
    };
  },

  render: function () {
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

    var title = this.props.product.title || '';

    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          onScroll={({ nativeEvent }) => this.state.scrollTop.setValue(nativeEvent.contentOffset.y)}
          scrollEventThrottle={100}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}>
          <Text style={styles.title}>
            {title}
          </Text>
          <View style={styles.pictureWrapper}>
            <Image style={styles.picture} source={{ uri: this.props.product.image }} />
          </View>
          <Text style={styles.description}>
            {this.props.product.description}
          </Text>
          <Section>
            {titleHeader}
          </Section>
          <StoreView store={this.props.product.store} />
          <TouchableOpacity
            accessibilityLabel="Share this product"
            accessibilityTraits="button"
            onPress={this.props.onShare}
            style={styles.shareButton}>
            <Image source={require('./img/share.png')} />
          </TouchableOpacity>
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
            {title}
          </Text>
          {titleHeader}
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
var WIDTH = Dimensions.get('window').width;

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
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 32,
    marginVertical: 20,
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
  const friendsGoing = store.friendsSchedules.filter((friend) => friend.schedule[productID]);
  const map = store.maps.find(({ name }) => name === props.product.location);

  return {
    isAddedToSchedule: store.schedule[props.product.id],
    isLoggedIn: store.user.isLoggedIn,
    sharedSchedule: store.user.sharedSchedule,
    productURLTemplate: store.config.productURLTemplate,
    topics: store.topics,
    friendsGoing,
    map,
  };
}

module.exports = connect(select)(F8ProductDetails);
