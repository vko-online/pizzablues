/**
 * @flow
 */
'use strict';

const React = require('react');
const {
    View,
    Text,
} = require('react-native');
const moment = require('moment');
const t = require('tcomb-form-native');
const Form = t.form.Form;
const AgendaSchema = t.struct({
    title: t.String,
    description: t.maybe(t.String),
    private: t.Boolean,
    date: t.maybe(t.Date),
    location: t.maybe(t.String),
    price: t.maybe(t.Num),
    pricePerPerson: t.Boolean,
});

const googleMapsTemplate = function (locals) {
    return (
        <View style={{ height: 300, backgroundColor: 'green' }}>
            <Text>Google maps</Text>
        </View>
    );
};

const options = {
    fields: {
        description: {
            multiline: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 100
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 100
                    }
                }
            }
        },
        location: {
            template: googleMapsTemplate
        }
    },
    config: {
        format: (date) => moment(date).format('HH:MM, dddd, Do MMMM')
    }
};

class NewAgendaForm extends React.Component {
    render() {
        return (
            <Form
                ref="form"
                type={AgendaSchema}
                options={options}
                />
        );
    }
}

module.exports = NewAgendaForm;
