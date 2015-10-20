
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
    isEmergency: React.propTypes.bool.isRequired,
    aroundCount: React.propTypes.number.isRequired,
    handleEmergencyClick: React.propTypes.function.isRequired,
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
            <Text style={styles.emergencyButtonText}>{ this.props.emergency ? "Abort" : "Broadcast Emergency"}</Text>
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

var styles = StyleSheet.create({
});

module.exports = Modal;
