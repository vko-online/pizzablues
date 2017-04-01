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

import type {Page, FAQ, Config } from '../../reducers';

type Props = {
  pages: Array<Page>;
  faqs: Array<FAQ>;
  config: Config;
}

const POLICIES_LINKS = [{
  title: 'Terms of Service',
  url: 'https://m.facebook.com/terms?_rdr',
}, {
  title: 'Data Policy',
  url: 'https://m.facebook.com/policies?_rdr',
}, {
  title: 'Code of Conduct',
  url: 'https://www.fbf8.com/code-of-conduct',
}];

class F8InfoView extends React.Component {
  props: Props;

  constructor(props) {
    console.log('props', props);
    super(props);
  }

  render() {
    return (
      <ListContainer
        title="Information"
        backgroundImage={require('./img/info-background.png')}
        backgroundColor={'#47BFBF'}>
        <PureListView
          renderRow={() => { } }
          renderEmptyList={() => (
            <View>
              <WiFiDetails
                network={this.props.config.wifiNetwork}
                password={this.props.config.wifiPassword}
                />
              <CommonQuestions faqs={this.props.faqs} />
              <LinksList title="Facebook pages" links={this.props.pages} />
              <LinksList title="Facebook policies" links={POLICIES_LINKS} />
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
