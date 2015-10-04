
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

var EmergencyView = React.createClass({
  render() {

    const modal = (
      <View style={styles.emergencyReceivedContainer}>
        <Text style={styles.emergencyReceivedText}>
          There is an emergency nearby and you can help!
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={styles.emergencyReceivedButton}
            onPress={this.directTo}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyReceivedButtonText}>Route there</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.emergencyReceivedButton}
            onPress={this.directTo}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyReceivedButtonText}>Dismiss</Text>
          </TouchableHighlight>
        </View>
      </View>
    );

    return (
      <View style={styles.backgroundContainer}>
          <View>
          <TouchableHighlight
            onPress={this.showSettings}>
            <Image
              style={styles.settingsIcon}
              source={require('image!ic_settings_black_48dp')} />
          </TouchableHighlight>
            <Image
              style={styles.settingsIcon}
              source={require('image!ic_settings_black_48dp')} />
          </View>
          <Image
            style={styles.circles}
            source={require('image!background_circles')} />
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.emergencyButton}
            onPress={this.handleEmergencyClick}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyButtonText}>Broadcast Emergency</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#3645a7',
    flex: 1,
  },
  settingsIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    top: 10
  },
  emergencyReceivedContainer: {
    right: 0,
    left: 0,
    margin: 15,
    padding: 10,
    height: 120,
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: '#f10000'
  },
  emergencyReceivedText: {
    fontSize: 20,
    color: '#fff'
  },
  emergencyReceivedButton: {
    padding: 5,
    backgroundColor: '#a90b1d',
    borderRadius: 3
  },
  emergencyReceivedButtonText: {
    fontSize: 20,
    color: '#fff'
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 210
  },
  emergencyButton: {
    width: 180,
    height: 180,
    borderRadius: 200,
    backgroundColor: '#ff4081',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  circlesWrapper: {
    justifyContent: 'center',
  },
  circles: {
    height: 550,
    width: 550,
    position: 'absolute',
    bottom: -160,
    right: -90
  }
});

module.exports = EmergencyView;
