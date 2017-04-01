/**
 * @flow
 */
'use strict';

var F8SessionCell = require('F8SessionCell');
var Navigator = require('Navigator');
var React = require('React');
var SessionsSectionHeader = require('./SessionsSectionHeader');
var PureListView = require('../../common/PureListView');
var {groupSessionsByDays} = require('./groupSessions');

import type {Session } from '../../reducers/sessions';
import type {SessionsListData } from './groupSessions';

type Props = {
  sessions: Array<Session>;
  navigator: Navigator;
  renderEmptyList?: (decision: string) => ReactElement;
};

type State = {
  todaySessions: SessionsListData;
};

class ScheduleListView extends React.Component {
  props: Props;
  state: State;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);
    this.state = {
      todaySessions: groupSessionsByDays(props.sessions),
    };

    this._innerRef = null;

    (this: any).renderSectionHeader = this.renderSectionHeader.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.sessions !== this.props.sessions) {
      this.setState({
        todaySessions: groupSessionsByDays(nextProps.sessions),
      });
    }
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.todaySessions}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        {...(this.props: any /* flow can't guarantee the shape of props */)}
  renderEmptyList = { this.renderEmptyList }
  />
    );
}

renderSectionHeader(sectionData: any, sectionID: string) {
  return <SessionsSectionHeader title={sectionID} />;
}

renderRow(session: Session) {
  return (
    <F8SessionCell
      onPress={() => this.openSession(session)}
      session={session}
      />
  );
}

renderEmptyList(decision:string): ?ReactElement {
  const {renderEmptyList} = this.props;
  return renderEmptyList && renderEmptyList(decision);
}

openSession(session: Session) {
  this.props.navigator.push({
    session,
    allSessions: this.state.todaySessions,
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

  module.exports = ScheduleListView;
