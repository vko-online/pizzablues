/**
 * @flow
 */
'use strict';

const React = require('react');
const {
    View,
    Text,
    TextInput,
    StyleSheet,
    Switch,
    Dimensions,
    DatePickerIOS,
    TouchableOpacity,
} = require('react-native');
const moment = require('moment');
const FormSection = require('./FormSection');
const {formInput} = require('../actions');
const {connect} = require('react-redux');
import type {FormData } from '../reducers/form';
var timeZoneOffsetInHours = (-1) * (new Date()).getTimezoneOffset() / 60;
var minDate = new Date();
minDate.setHours(minDate.getHours() + 1);
type Props = {
    formInputData: (value: FormData) => void;
}

class NewAgendaForm extends React.Component {
    props: Props;
    state: FormData;

    constructor(props) {
        super(props);
        this.state = {
            sessionTitle: '',
            sessionPrivate: false,
            startTime: new Date(),
            sessionDescription: '',
            sessionPrice: '0',
            pricePerUser: false,
            sessionLocation: 'Almaty',
            showStartTimePicker: false,
        };
    }

    componentDidMount() {
        this.props.formInputData(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.formInputData(this.state);
    }

    render() {
        return (
            <View>
                <FormSection title={'Basic info'}>
                    <View style={styles.element}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput style={[styles.input, styles.box]}
                            onChangeText={(text) => this.setState({ sessionTitle: text })}
                            value={this.state.sessionTitle} />
                    </View>
                    <View>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity
                            style={[styles.picker, styles.box]}
                            onPress={() => this.setState({ showStartTimePicker: !this.state.showStartTimePicker })}>
                            <Text style={{ fontSize: 15 }}>
                                {moment(this.state.startTime).format('HH:MM, dddd, Do MMMM')}
                            </Text>
                        </TouchableOpacity>
                        {this.state.showStartTimePicker && (
                            <DatePickerIOS
                                date={this.state.startTime}
                                minimumDate={minDate}
                                minuteInterval={10}
                                mode="datetime"
                                timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
                                onDateChange={(date) => this.setState({ startTime: date })}
                                />
                        )}
                    </View>
                    <View style={styles.element}>
                        <Text style={styles.label}>Private</Text>
                        <View style={[styles.elementRow, styles.box]}>
                            <Text style={styles.infoTip}>Only invited users will see</Text>
                            <Switch style={styles.switch}
                                onValueChange={(bool) => this.setState({ sessionPrivate: bool })}
                                value={this.state.sessionPrivate} />
                        </View>
                    </View>

                </FormSection>
                <FormSection title={'Location'}>
                    <Text>google map</Text>
                </FormSection>
                <FormSection title={'Advanced'}>
                    <View style={styles.element}>
                        <View style={styles.elementRow}>
                            <View style={styles.rowElement2}>
                                <Text style={styles.label}>Price</Text>
                                <TextInput style={[styles.input, styles.box]}
                                    onChangeText={(num) => this.setState({ sessionPrice: num })}
                                    value={this.state.sessionPrice} />
                            </View>
                            <View style={[styles.rowElement2, styles.pricePerUser]}>
                                <Text style={styles.infoTip}>Cost per Person</Text>
                                <Switch style={styles.switch}
                                    onValueChange={(data) => this.setState({ pricePerUser: data })}
                                    value={this.state.pricePerUser} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.element}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput style={styles.textarea}
                            numberOfLines={3}
                            multiline={true}
                            onChangeText={(text) => this.setState({ sessionDescription: text })}
                            value={this.state.sessionDescription} />
                    </View>
                </FormSection>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: '#9cbaf9',
    },
    element: {
        marginVertical: 5,
    },
    box: {
        borderColor: '#eee',
        borderWidth: 1,
        height: 50,
        marginTop: 3,
    },
    elementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowElement2: {
        width: Dimensions.get('window').width / 2 - 30,
    },
    infoTip: {
        color: 'grey',
        fontSize: 12,
        marginRight: 10,
        marginLeft: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        padding: 10,
        textAlign: 'right'
    },
    picker: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textarea: {
        marginTop: 3,
        height: 120,
        borderColor: '#eee',
        borderWidth: 1,
        flex: 1,
        fontSize: 14,
        padding: 10,
    },
    switch: {
        marginTop: 3,
    },
    pricePerUser: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
function select(store) {
    return {
        data: store.form.data
    };
}

function actions(dispatch) {
    return {
        formInputData: (value) => dispatch(formInput(value)),
    };
}

module.exports = connect(select, actions)(NewAgendaForm);
