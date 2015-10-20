var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  SwitchAndroid,
  Image,
  TouchableOpacity
} = React;

var styles = require('./../stylesheet')

var SettingsView = React.createClass({

  propTypes: {
    hideSettings: React.PropTypes.func.isRequired,
    onChangeNumber: React.PropTypes.func.isRequired,
    phoneNumber: React.PropTypes.string.isRequired,
    shouldCallEmergencyAutomatically: React.PropTypes.bool.isRequired,
    onChangeShouldCallEmergencyAutomatically: React.PropTypes.func.isRequired,
    emergencyText: React.PropTypes.string.isRequired,
    onChangeEmergencyText: React.PropTypes.func.isRequired,
  },

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.backButtonTouch}
            onPress={this.props.hideSettings}>
            <Image
              style={styles.backButton}
              source={require('image!ic_arrow_back_white_48dp')} />
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>HelperNet</Text>
          <View style={styles.spaceView}/>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>
              Emergency Number
            </Text>
            <TextInput
              style={{height: 50, borderColor: 'gray', borderWidth: 1}}
              onChangeText={this.props.onChangeNumber}
              underlineColorAndroid='#5a5a5a'
              value={this.props.phoneNumber} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>
              Call Emergency Number automatically
            </Text>
            <SwitchAndroid
             onValueChange={this.props.onChangeShouldCallEmergencyAutomatically}
             style={styles.switch}
             value={this.props.shouldCallEmergencyAutomatically}
             onTintColor='#ff0000'
             thumbTintColor='#ff0000'
             tintColor='#ff0000' />
          </View>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>
              Emgergency Text
            </Text>
            <TextInput
              style={{height: 100, borderColor: 'gray', borderWidth: 1}}
              onChangeText={this.props.onChangeEmergencyText}
              underlineColorAndroid='#5a5a5a'
              value={this.props.emergencyText}
              multiline={true}
              numberOfLines={4} />
          </View>
          <View style={styles.aroundCountContainer}>
            <Text style={styles.copyrightText}>
              &copy; Copyright by #nerdishByNature
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
});

module.exports = SettingsView;
