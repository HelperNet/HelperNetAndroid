/**
 * HelperNet React Native App
 * https://HelperNet.github.io
 */

var React = require('react-native');
var _ = require('lodash');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var Subscribable = require('Subscribable');

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
  Image,
  TouchableOpacity,
  BackAndroid
} = React;

var EmergencyView = require('./views/EmergencyView')
var SettingsView = require('./views/SettingsView')

const initialState = {
  enabled: true,
  number: "+491736353009",
  callEmergencyAutomatically: false,
  isEnabled: true,
  emergencyText: 'Please help me I have an emergency!',
  aroundCount: 0,
  emergency: false,
  receivedEmergency: false,
  receivedEmergencyText: '',
  location: {},
  showSettings: false
};

var HelperNet = React.createClass({

  mixins: [Subscribable.Mixin],

  getInitialState() {
    return initialState;
  },

  componentWillMount() {
    if (this.state.enabled) {
      NativeModules.P2PKit.enable();
    }

    this.addListenerOn(RCTDeviceEventEmitter,
                   'aroundCountChanged',
                   this.handleAroundChange);

    this.addListenerOn(RCTDeviceEventEmitter,
                   'emergencyReceived',
                   this.handleEmergencyReceived);

    this.addListenerOn(RCTDeviceEventEmitter,
                   'location',
                   this.handleLocationReceived);

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.showSettings) {
        this.hideSettings()
        return true;
      }
      return false;
    });
  },

  componentDidMount() {
    _.forEach(_.keys(this.state), (key) => {
      AsyncStorage.getItem(key)
        .then((value) => {console.log("load key, value: ", key, value); this.setState({key: value})})
    });
  },

  componentDidUpdate(prevProps, prevState) {
    _.forIn(this.state, (value, key) => {
      if (value != null && key != null && value != initialState[key] && value != prevState[key]) {
        console.log("set key, value: ", key, value);
        AsyncStorage.setItem(key, value);
      }
    })
  },

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({location: initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  handleAroundChange(event) {
    this.setState({aroundCount: event.newCount});
  },

  handleEmergencyReceived(event) {
    this.setState({
      receivedEmergency: true,
      receivedEmergencyText: event.message
    });
  },

  handleLocationReceived(event) {
    this.setState({
      location: {
        lat: event.lat,
        lng: event.lng
      }
    });
  },

  sendMessage() {
    // this.getLocation().then((location) => {
    //   const {latitude, longitude} = location.coords;
    //   NativeModules.P2PKit.setMessage(`no${this.state.emergencyText}|lo${latitude},${longitude}`);
    // });
    NativeModules.P2PKit.setMessage(`NO${this.state.emergencyText}|lo47.3897774,8.5164106`);
  },

  resetMessage() {
    NativeModules.P2PKit.resetMessage();
  },

  directTo() {
    const {lat, lng } = this.state.location;
    NativeModules.P2PKit.directTo(47.3897774,8.5164106,lat,lng);
  },
  //
  // handleEnabledChanged(isEnabled) {
  //   this.setState({isEnabled: isEnabled});
  //   if (isEnabled) {
  //     NativeModules.P2PKit.enable();
  //   } else {
  //     NativeModules.P2PKit.disable();
  //   }
  // },

  handleEmergencyClick() {
    if (this.state.emergency) {
      this.resetMessage();
      this.setState({emergency: false});
    } else {
      if (this.state.callEmergencyAutomatically) {
        NativeModules.P2PKit.phoneCall(this.state.number);
      }
      this.sendMessage();
      this.setState({emergency: true});
    }
  },

  showSettings() {
    this.setState({showSettings: true});
  },

  hideSettings() {
    this.setState({showSettings: false});
  },

  dismissModal() {
    this.setState({receivedEmergency: false});
  },

  accept() {
    this.directTo();
    NativeModules.P2PKit.setMessage(`OT`);
  },

  render() {

    const settingsView =
      <SettingsView
      />

    const emergencyView =
      <EmergencyView
      />

    return this.state.showSettings ? settingsView: emergencyView;
  }
});





// <View style={styles.switchContainer}>
//   <Text style={styles.label}>
//     Enabled
//   </Text>
//   <SwitchAndroid
//    onValueChange={this.handleEnabledChanged}
//    style={styles.switch}
//    value={this.state.isEnabled}
//    onTintColor="ff0000"
//    thumbTintColor="ff0000"
//    tintColor='ff0000' />
// </View>


var styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  toolbar: {
    backgroundColor: '#303F9F',
    paddingTop: 10,
    paddingBottom: 10,
    // height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    height: 30,
    width: 30
  },
  backButtonTouch: {
    flex: 1
  },
  toolbarTitle: {
    width: 100,
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  spaceView: {
    flex: 1
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  // emergencyReceivedContainer: {
  //   marginBottom: 15,
  //   borderColor: '#e70000',
  //   borderWidth: 3,
  //   borderRadius: 8,
  //   padding: 10
  // },
  numberContainer: {
    // padding: 10
  },
  numberText: {
    fontSize: 20,
    marginTop: 10
  },
  switchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {

  },
  switch: {
    marginBottom: 10
  },
  button: {
    height: 65,
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e70000',
    borderColor: '#e70000',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 17
  },
  aroundCountContainer: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  aroundCountText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 110,
    color: '#fff',
    fontWeight: 'bold',
  },
  copyrightText: {
    flex: 1,
    marginBottom: 10
  },
  backgroundContainer: {
    backgroundColor: '#303F9F',
    flex: 1,
  },
  touchableSettingsIcon: {
    // position: 'absolute',
    // right: 10,
    // top: 10
    flex: 1
  },
  settingsIcon: {
    width: 40,
    height: 40,
    // position: 'relative',
    // right: 0
    alignSelf: 'flex-end',
    marginRight: 10

  },
  emergencyReceivedContainer: {
    right: 0,
    left: 0,
    margin: 15,
    padding: 10,
    height: 170,
    position: 'absolute',
    marginTop: 150,
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
    marginTop: 110
  },
  emergencyButton: {
    width: 180,
    height: 180,
    borderRadius: 200,
    backgroundColor: '#F50057',
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

AppRegistry.registerComponent('HelperNet', () => HelperNet);
