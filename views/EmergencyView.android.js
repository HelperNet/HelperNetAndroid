var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} = React;

var Modal = require('./Modal');
var EmergencyViewContent = require('./EmergencyViewContent');

var EmergencyView = React.createClass({

  propTypes: {
    isEmergency: React.propTypes.bool.isRequired,
    receivedEmergency: React.propTypes.bool.isRequired,
    aroundCount: React.propTypes.number.isRequired,
    handleEmergencyClick: React.propTypes.function.isRequired,
    receivedEmergencyText: React.propTypes.string.isRequired,
    onAcceptEmergencyCall: React.propTypes.function.isRequired,
    onDismissEmergencyCall: React.propTypes.function.isRequired
  },

  render() {

    const {
      receivedEmergency,
      isEmergency,
      aroundCount,
      handleEmergencyClick,
      receivedEmergencyText,
      onAcceptEmergencyCall,
      onDismissEmergencyCall
    } = this.props;

    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.toolbar}>
          <View style={styles.spaceView}></View>
          <Text style={styles.toolbarTitle}>HelperNet</Text>
          <TouchableOpacity style={styles.touchableSettingsIcon}
            onPress={this.showSettings}>
            <Image
              style={styles.settingsIcon}
              source={require('image!ic_settings_white_48dp')} />
          </TouchableOpacity>
        </View>
        { receivedEmergency ?
          <Modal
           receivedEmergencyText={receivedEmergencyText}
           onAccept={onAcceptEmergencyCall}
           onDismiss={onDismissEmergencyCall} /> :
           <EmergencyViewContent {isEmergency, aroundCount, handleEmergencyClick} />
        }
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
