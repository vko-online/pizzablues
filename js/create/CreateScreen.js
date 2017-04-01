/**
 * @flow
 */
'use strict';

const React = require('react');
const ListContainer = require('ListContainer');
const PureListView = require('../common/PureListView');
const {
    View,
    StyleSheet,
} = require('react-native');
const {connect} = require('react-redux');
const NewAgendaForm = require('./NewAgendaForm2');
const {submitForm} = require('../actions');
import type {FormData } from '../reducers/form';

class CreateScreen extends React.Component {
    props: {
        navigator: any;
        canSubmit: boolean;
        formData: FormData;
        onClose: ?() => void;
    };

    constructor(props) {
        super(props);
        (this: any).save = this.save.bind(this);
        (this: any).close = this.close.bind(this);
    }

    render() {
        let leftItem, rightItem;
        if (this.props.navigator) {
            leftItem = { title: 'Cancel', onPress: this.close };
            rightItem = {
                title: 'Save',
                onPress: this.save,
                disabled: !this.props.canSubmit,
            };
        }

        return (
            <ListContainer
                title="New Agenda"
                leftItem={leftItem}
                rightItem={rightItem}
                backgroundImage={require('../tabs/notifications/img/notifications-background.png')}
                backgroundColor={'#47BFBF'}>
                <PureListView
                    renderRow={() => { } }
                    renderEmptyList={() => (
                        <View style={styles.container}>
                            <NewAgendaForm />
                        </View>
                    )}
                    />
            </ListContainer>
        );
    }

    save() {
        this.props.submitForm(this.props.formData);
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
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // '#f2f2f3',
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
        bottom: 100,
        padding: 8,
    },
});

function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn,
        friendsSchedules: store.friendsSchedules,
        canSubmit: store.form.canSubmit,
        formData: store.form.data,
    };
}

function actions(dispatch) {
    return {
        submitForm: (value) => dispatch(submitForm(value)),
    };
}

module.exports = connect(select, actions)(CreateScreen);
