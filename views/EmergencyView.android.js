var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity
} = React;

var Modal = require('./Modal');
var EmergencyViewContent = require('./EmergencyViewContent');

var styles = require('./../stylesheet')

var EmergencyView = React.createClass({

  propTypes: {
    isEmergency: React.PropTypes.bool.isRequired,
    receivedEmergency: React.PropTypes.bool.isRequired,
    aroundCount: React.PropTypes.number.isRequired,
    handleEmergencyClick: React.PropTypes.func.isRequired,
    receivedEmergencyText: React.PropTypes.string.isRequired,
    onAcceptEmergencyCall: React.PropTypes.func.isRequired,
    onDismissEmergencyCall: React.PropTypes.func.isRequired,
    showSettings: React.PropTypes.func.isRequired
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
            onPress={this.props.showSettings}>
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
           <EmergencyViewContent {...{isEmergency, aroundCount, handleEmergencyClick}} />
        }
      </View>
    )
  }
});

module.exports = EmergencyView;
