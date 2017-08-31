/**
 * @providesModule F8InfoView
 * @flow
 */
'use strict';

var CommonQuestions = require('./CommonQuestions');
var LinksList = require('./LinksList');
var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
var React = require('React');
var View = require('View');
const {connect} = require('react-redux');
var WiFiDetails = require('./WiFiDetails');

import type {Page, Faq, Config } from '../../reducers';

type Props = {
  pages: Array<Page>;
  faqs: Array<Faq>;
  config: Config;
}

const POLICIES_LINKS = [{
  title: 'Условия использования',
  url: 'https://paul-server.herokuapp.com',
}, {
  title: 'Политика конфиденциальности',
  url: 'https://paul-server.herokuapp.com',
}];

const PAGES_LINKS = [{
  title: 'Фейсбук',
  url: 'https://www.facebook.com/paul.esentai',
}, {
  title: 'Инстаграм',
  url: 'https://www.instagram.com/paul_almaty',
}];

class F8InfoView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListContainer
        title="Информация"
        backgroundImage={require('./img/info-background2.jpg')}
        backgroundColor={'#47BFBF'}>
        <PureListView
          renderRow={() => { } }
          data={[]}
          renderEmptyList={() => (
            <View>
              <WiFiDetails
                network={this.props.config.wifiNetwork}
                password={this.props.config.wifiPassword}
                />
              <CommonQuestions faqs={this.props.faqs} />
              <LinksList title="Официальные страницы" links={PAGES_LINKS} />
              <LinksList title="Правила" links={POLICIES_LINKS} />
            </View>
          )}
          {...this.props}
          />
      </ListContainer>

    );
  }
}

function select(store) {
  return {
    pages: store.pages,
    faqs: store.faqs,
    config: store.config,
  };
}

module.exports = connect(select)(F8InfoView);
