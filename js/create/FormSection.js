/**
 * @flow
 */
'use strict';

var React = require('React');
import LinearGradient from 'react-native-linear-gradient';
var StyleSheet = require('StyleSheet');
var View = require('View');
var Text = require('Text');
var F8Colors = require('F8Colors');

class FormSection extends React.Component {
    props: {
        title: string;
    };
    state: {
    };

    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <LinearGradient colors={['#F4F6F7', '#EBEEF1']} style={styles.header}>
                    <Text style={styles.label}>
                        {this.props.title}
                    </Text>
                </LinearGradient>
                <View style={styles.container}>{this.props.children}</View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        height: 32,
        justifyContent: 'center',
        paddingLeft: 17,
    },
    label: {
        color: F8Colors.lightText,
        backgroundColor: 'transparent',
    },
});

module.exports = FormSection;
