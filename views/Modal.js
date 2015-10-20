var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  NativeModules,
  TouchableHighlight,
  SwitchAndroid,
  AsyncStorage,
  Image
} = React;

var styles = require('./../stylesheet')

var Modal = React.createClass({

  propTypes: {
    receivedEmergencyText: React.PropTypes.string.isRequired,
    onAccept: React.PropTypes.func.isRequired,
    onDismiss: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <View style={styles.emergencyReceivedContainer}>
        <Text style={styles.emergencyReceivedText}>
          There is an emergency nearby and you can help! {'\n\n'}
          { this.props.receivedEmergencyText }
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={styles.emergencyReceivedButton}
            onPress={this.props.onAccept}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyReceivedButtonText}>Route there</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.emergencyReceivedButton}
            onPress={this.props.onDismiss}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyReceivedButtonText}>Dismiss</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
});


module.exports = Modal;
