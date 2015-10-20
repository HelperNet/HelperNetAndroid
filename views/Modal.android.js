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

var Modal = React.createClass({

  propTypes: {
    receivedEmergencyText: React.propTypes.string.isRequired,
    onAccept: React.propTypes.function.isRequired,
    onDismiss: React.propTypes.function.isRequired
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

var styles = StyleSheet.create({
});

module.exports = Modal;
