/**
 * @flow
 */
'use strict';

const React = require('react');
const {
  View,
  ScrollView,
} = require('react-native');
const StyleSheet = require('F8StyleSheet');
const Header = require('./Header');
const RatingQuestion = require('./RatingQuestion');
const F8Button = require('F8Button');

import type {Question} from '../reducers/surveys';
import type {Product} from '../reducers/products';

type Props = {
  product: Product;
  questions: Array<Question>;
  onSubmit: (answers: Array<number>) => void;
  style?: any;
};

class RatingCard extends React.Component {
  props: Props;
  state: Object;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const questions = this.props.questions.map((question, ii) => (
      <RatingQuestion
        key={ii}
        style={styles.question}
        question={question}
        rating={this.state[ii]}
        onChange={(rating) => this.setState({[ii]: rating})}
      />
    ));
    const completed = Object.keys(this.state).length === this.props.questions.length;
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView>
          <Header product={this.props.product} />
          {questions}
        </ScrollView>
        <F8Button
          style={styles.button}
          type={completed ? 'primary' : 'bordered'}
          caption="Отправить резенцию"
          onPress={() => completed && this.submit()}
        />
      </View>
    );
  }

  submit() {
    const answers = this.props.questions.map((_, ii) => this.state[ii]);
    this.props.onSubmit(answers);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  question: {
    padding: 40,
    paddingVertical: 25,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 20,
  }
});

module.exports = RatingCard;
