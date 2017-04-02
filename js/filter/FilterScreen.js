/**
 * @flow
 */
'use strict';

const React = require('react');
const F8Header = require('F8Header');
const F8Colors = require('F8Colors');
const CategoryItem = require('./CategoryItem');
const F8Button = require('F8Button');
var ItemsWithSeparator = require('../common/ItemsWithSeparator');

const {
  Animated,
  View,
  StyleSheet,
  ScrollView,
} = require('react-native');

const shallowEqual = require('fbjs/lib/shallowEqual');
const {
  applyCategoriesFilter,
} = require('../actions');
const {connect} = require('react-redux');

class FilterScreen extends React.Component {
  props: {
    isLoggedIn: boolean,
    categories: Array<string>;
    selectedCategories: {[id: string]: boolean};
    dispatch: (action: any) => void;
    navigator: any;
    onClose: ?() => void;
  };
  state: {
    selectedCategories: {[id: string]: boolean};
    anim: Animated.Value;
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: {...this.props.selectedCategories},
      anim: new Animated.Value(0),
    };

    (this: any).applyFilter = this.applyFilter.bind(this);
    (this: any).clearFilter = this.clearFilter.bind(this);
    (this: any).close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedCategories !== nextProps.selectedCategories) {
      this.setState({selectedCategories: {...nextProps.selectedCategories}});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectedCategories !== nextState.selectedCategories) {
      const changedCategories = !shallowEqual(
        nextProps.selectedCategories,
        nextState.selectedCategories,
      );
      const toValue = changedCategories ? 1 : 0;
      Animated.spring(this.state.anim, {toValue}).start();
    }
  }

  render() {
    var bottom = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
    var categories = this.props.categories.map((category, ii) => (
      <CategoryItem
        key={category}
        category={category}
        color={F8Colors.colorForCategory(this.props.categories.length, ii)}
        isChecked={this.state.selectedCategories[category]}
        onToggle={this.toggleCategory.bind(this, category)}
      />
    ));
    var selectedAnyCategories = this.props.categories.some(
      (topic) => this.state.selectedCategories[topic]
    );

    let leftItem, rightItem;
    if (this.props.navigator) {
      leftItem = {title: 'Отмена', onPress: this.close};
    }
    if (selectedAnyCategories) {
      rightItem = {
        title: 'Очистить',
        icon: require('../common/img/x-white.png'),
        onPress: this.clearFilter,
      };
    }
    return (
      <View style={styles.container}>
        <F8Header
          title="Категории"
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}>
          <ItemsWithSeparator separatorStyle={styles.separator}>
            {categories}
          </ItemsWithSeparator>
        </ScrollView>
        <Animated.View style={[styles.applyButton, {bottom}]}>
          <F8Button
            caption="Применить"
            onPress={this.applyFilter}
          />
        </Animated.View>
      </View>
    );
  }

  toggleCategory(topic: string, value: boolean) {
    var selectedCategories = {...this.state.selectedCategories};
    var value = !selectedCategories[topic];
    if (value) {
      selectedCategories[topic] = true;
    } else {
      delete selectedCategories[topic];
    }
    this.setState({selectedCategories});
  }

  applyFilter() {
    this.props.dispatch(applyCategoriesFilter(this.state.selectedCategories));
    this.close();
  }

  close() {
    const {navigator, onClose} = this.props;
    if (navigator) {
      requestAnimationFrame(() => navigator.pop());
    }
    if (onClose) {
      onClose();
    }
  }

  clearFilter() {
    this.setState({selectedCategories: {}});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3B79',
  },
  scrollview: {
    padding: 20,
    paddingBottom: 20 + 49,
  },
  separator: {
    backgroundColor: '#FFFFFF26',
  },
  applyButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#1B3B79',
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn,
    categories: store.categories,
    selectedCategories: store.filter,
  };
}

module.exports = connect(select)(FilterScreen);
