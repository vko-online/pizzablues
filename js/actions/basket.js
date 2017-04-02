/**
 * @flow
 */

'use strict';

const Parse = require('parse/react-native');
const {AppEventsLogger} = require('react-native-fbsdk');
const Platform = require('Platform');
const InteractionManager = require('InteractionManager');
const ActionSheetIOS = require('ActionSheetIOS');
const Alert = require('Alert');
const Share = require('react-native-share');
const ParseProduct = Parse.Object.extend('Product');
const {currentInstallation, updateInstallation} = require('./installation');

import type { ThunkAction, PromiseAction, Dispatch } from './types';
import type { Product } from '../reducers/products';

function addToBasket(id: string): ThunkAction {
  return (dispatch: Dispatch) => {
    if (Parse.User.current()) {
      Parse.User.current().relation('myBasket').add(new ParseProduct({ id }));
      Parse.User.current().save();
      currentInstallation().then((installation) => {
        installation.addUnique('channels', `basket_${id}`);
        return installation.save();
      });
    }
    dispatch({
      type: 'PRODUCT_ADDED',
      id,
    });
  };
}

function removeFromBasket(id: string): ThunkAction {
  return (dispatch: Dispatch) => {
    if (Parse.User.current()) {
      Parse.User.current().relation('myBasket').remove(new ParseProduct({ id }));
      Parse.User.current().save();
      currentInstallation().then((installation) => {
        installation.remove('channels', `basket_${id}`);
        return installation.save();
      });
    }
    dispatch({
      type: 'PRODUCT_REMOVED',
      id,
    });
  };
}

function removeFromBasketWithPrompt(product: Product): ThunkAction {
  return (dispatch) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Удалить с корзины', 'Отмена'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      }, (buttonIndex) => {
        if (buttonIndex === 0) {
          dispatch(removeFromBasket(product.id));
        }
      });
    } else {
      Alert.alert(
        'Удалить с корзины',
        `Вы действительно хотите удалить "${product.title}" с корзины?`,
        [
          { text: 'Отмена' },
          {
            text: 'Удалить',
            onPress: () => dispatch(removeFromBasket(product.id))
          },
        ]
      );
    }
  };
}

async function restoreBasket(): PromiseAction {
  const list = await Parse.User.current().relation('myBasket').query().find();
  const channels = list.map(({id}) => `basket_${id}`);
  updateInstallation({ channels });

  return {
    type: 'RESTORED_BASKET',
    list,
  };
}

async function loadFriendsBaskets(): PromiseAction {
  const list = await Parse.Cloud.run('friends');
  await InteractionManager.runAfterInteractions();
  return {
    type: 'LOADED_FRIENDS_BASKETS',
    list,
  };
}

function setSharingEnabled(enabled: boolean): ThunkAction {
  return (dispatch) => {
    dispatch({
      type: 'SET_SHARING',
      enabled,
    });
    Parse.User.current().set('sharedBasket', enabled);
    Parse.User.current().save();
  };
}

function shareProduct(product: Product): ThunkAction {
  return (dispatch, getState) => {
    const {productURLTemplate} = getState().config;
    const url = productURLTemplate
      .replace('{productId}', product.id);

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions({
        message: `${product.title} - ${product.price}`,
        url,
      }, (e) => console.error(e), logShare.bind(null, product.id));
    } else {
      Share.open({
        share_text: product.title,
        share_URL: url,
        title: `Поделиться с ссылкой на ${product.title} - ${product.price}`,
      }, (e) => logShare(product.id, true, null));
    }
  };
}

function logShare(id, completed, activity) {
  AppEventsLogger.logEvent('Share Product', 1, { id });
  Parse.Analytics.track('share', {
    id,
    completed: completed ? 'yes' : 'no',
    activity: activity || '?'
  });
}

module.exports = {
  shareProduct,
  addToBasket,
  removeFromBasket,
  restoreBasket,
  loadFriendsBaskets,
  setSharingEnabled,
  removeFromBasketWithPrompt,
};
