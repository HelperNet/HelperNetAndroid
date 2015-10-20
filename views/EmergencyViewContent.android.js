
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
    isEmergency: React.PropTypes.bool.isRequired,
    aroundCount: React.PropTypes.number.isRequired,
    handleEmergencyClick: React.PropTypes.func.isRequired,
  },

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <Image
          style={styles.circles}
          source={require('image!background_circles')} />
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.emergencyButton}
            onPress={this.props.handleEmergencyClick}
            underlayColor='#EC407A'>
            <Text style={styles.emergencyButtonText}>{ this.props.isEmergency ? "Abort" : "Broadcast Emergency"}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.aroundCountWrapper}>
          <Text style={styles.aroundCountText}>
            {this.props.aroundCount} people nearby.
          </Text>
        </View>
      </View>
    )
  }
});

module.exports = Modal;
