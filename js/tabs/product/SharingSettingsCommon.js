/**
 * @flow
 */
'use strict';

var Image = require('Image');
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text, Heading1, Paragraph } = require('F8Text');
var ProfilePicture = require('../../common/ProfilePicture');
var View = require('View');

var { connect } = require('react-redux');

import type {State as User} from '../../reducers/user';

class SharingSettingsCommon extends React.Component {
  props: {
    user: User;
    style: any;
  };

  render() {
    const {user} = this.props;
    const title = user.name && user.id && (
      <View style={styles.title}>
        <ProfilePicture userID={user.id} size={24} />
        <Text style={styles.name}>
          История покупок {user.name.split(' ')[0]}
        </Text>
      </View>
    );
    return (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.image} source={require('./img/sharing-nux.png')}>
          {title}
        </Image>
        <View style={styles.content}>
          <Heading1 style={styles.h1}>
            Хотите что бы друзья узнавали ваши покупки?
          </Heading1>
          <Paragraph style={styles.p}>
            Это не будет опубликовано в Facebook. Только ваши друзья использующие
            это приложение смогут делится историями покупок и рекомендациями
          </Paragraph>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: 250,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 18,
    alignItems: 'center',
  },
  h1: {
    textAlign: 'center',
  },
  p: {
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 12,
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

function select(store) {
  return {
    user: store.user,
  };
}

module.exports = connect(select)(SharingSettingsCommon);
