/**
 * @flow
 */

'use strict';

const Parse = require('parse/react-native');
const Comment = Parse.Object.extend('Comment');
const Product = Parse.Object.extend('Product');

import type { ThunkAction, Dispatch } from './types';

function addNewComment(productId: string, text: string): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'COMMENT_ADDING',
    });
    if (Parse.User.current()) {
      var product = new Product({ id: productId });
      var comment = new Comment({
        text,
        userId: Parse.User.current().get('facebook_id'),
        displayName:  Parse.User.current().get('name'),
      });
      comment.save(null, {
        success: function() {
          product.relation('comments').add(comment);
          product.save();
          dispatch({
            type: 'COMMENT_ADDED',
            comment,
          });
        }
      });
    }
  };
}

module.exports = {
  addNewComment,
};
