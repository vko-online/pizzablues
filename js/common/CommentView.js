/**
 * @flow
 */
'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var F8Colors = require('F8Colors');
var Text = require('Text');
var {Paragraph} = require('F8Text');
import LinearGradient from 'react-native-linear-gradient';
var PureListView = require('./PureListView');
var ProfilePicture = require('./ProfilePicture');
var Dimensions = require('Dimensions');
var TouchableOpacity = require('TouchableOpacity');

import type {Product, Comment} from '../reducers/products';
type Props = {
  product: Product;
  onAddComment: (productId:string) => void;
}

const ADD_COMMENT_TEXT = 'Написать отзыв';
const HEIGHT = 40;

class CommentView extends React.Component {
  props: Props;
  _innerRef: ?PureListView;

  constructor() {
    super();
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).commentsInnerRef = this.commentsInnerRef.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).renderNewCommentButton = this.renderNewCommentButton.bind(this);
}

  render() {
    console.log('this.props.product', this.props.product);
    return (
      <View style={styles.container}>
        <PureListView
          ref={this.commentsInnerRef}
          data={this.props.product.comments}
          renderRow={this.renderRow}
          minContentHeight={10}
          renderFooter={this.renderFooter}
          contentInset={{top: -20, bottom: -20}}
          renderSectionHeader={this.renderSectionHeader}
          renderEmptyList = { this.renderEmptyList }/>
      </View>
    );
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.renderNewCommentButton()}
      </View>
    );
  }

  renderNewCommentButton() {
    return (
      <TouchableOpacity
        accessibilityLabel="Написать"
        accessibilityTraits="button"
        onPress={this.props.onAddComment}
        style={styles.newCommentButton}>
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={['#6A6AD5', '#6F86D9']}
          collapsable={false}
          style={styles.button}>
          <Text style={styles.caption}>
            {ADD_COMMENT_TEXT.toUpperCase()}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  commentsInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  renderSectionHeader() {
    return null;
  }

  renderEmptyList() {
    return (
      <View style={styles.noComment}>
        <Paragraph>Нет отзывов</Paragraph>
        {this.renderNewCommentButton()}
      </View>
    );
  }

  renderRow(comment: Comment) {
    console.log('renderRowcomment', comment);
    return (
      <View style={styles.comment}>
        <View style={styles.commentRow}>
          <ProfilePicture userID={comment.userId} size={20}/>
          <View style={styles.commentAuthor}>
            <Text style={styles.meta}>{comment.displayName}</Text>
            <Text style={styles.meta}>{(new Date(comment.updatedAt)).toDateString()}</Text>
          </View>
        </View>
        <Text>{comment.text}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  comment: {
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
  },
  commentRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  lane: {
    width: Dimensions.get('window').width - 100,
  },
  commentAuthor: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
    lineHeight: 14,
    color: F8Colors.lightText,
    marginLeft: 5,
  },
  container: {
    justifyContent: 'center',
    marginBottom: 50,
  },
  button: {
    flex: 1,
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
  noComment: {
    alignItems: 'center',
  },
  newCommentButton: {
    marginTop: 10,
    height: HEIGHT,
    width: 200,
  },
  footer: {
    alignItems: 'center',
  },
});

module.exports = CommentView;
