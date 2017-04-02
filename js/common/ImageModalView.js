var React = require('React');
var Modal = require('Modal');
var F8Header = require('F8Header');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var StyleSheet = require('StyleSheet');

type Props = {
  children: Array<ReactElement>;
  handleStyle?: Object;
  handleElement: ReactElement;
};

type State = {
  modalVisible: boolean;
}

class ImageModalView extends React.Component {
  props: Props;
  state: State = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{ backgroundColor: '#000' }}>
            <F8Header
              leftItem={{
                layout: 'icon',
                title: 'Закрыть',
                icon: require('./BackButtonIcon'),
                onPress: () => this.setModalVisible(false),
              }} />
            {this.props.children}
          </View>
        </Modal>
        <TouchableOpacity
          accessibilityLabel="Увеличить картинку"
          accessibilityTraits="image"
          onPress={() => this.setModalVisible(true)}
          style={this.props.handleStyle}>
          {this.props.handleElement}
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: 40,
    height: 20,
    backgroundColor: 'red',
  }
});

module.exports = ImageModalView;
