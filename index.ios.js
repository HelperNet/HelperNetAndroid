/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native')
var _ = require('lodash')
// var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter')
// var Subscribable = require('Subscribable')
var styles = require('./stylesheet')

var {
  AppRegistry,
  Text,
  TextInput,
  View,
  ScrollView,
  NativeModules,
  TouchableHighlight,
  // SwitchAndroid,
  AsyncStorage,
  Image,
  TouchableOpacity,
  // BackAndroid
} = React;

// const P2PService = require('./lib/P2PService')
const EmergencyView = require('./views/EmergencyView')
const SettingsView = require('./views/SettingsView')


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

  // mixins: [Subscribable.Mixin],

  getInitialState() {
    return initialState;
  },

  componentWillMount() {
    // if (this.state.enabled) {
    //   NativeModules.P2PKit.enable()
    // }

    // this.addListenerOn(RCTDeviceEventEmitter,
    //                'aroundCountChanged',
    //                this.handleAroundChange)
    //
    // this.addListenerOn(RCTDeviceEventEmitter,
    //                'emergencyReceived',
    //                this.handleEmergencyReceived)
    //
    // this.addListenerOn(RCTDeviceEventEmitter,
    //                'location',
    //                this.handleLocationReceived);

    // BackAndroid.addEventListener('hardwareBackPress', () => {
    //   if (this.state.showSettings) {
    //     this.hideSettings()
    //     return true;
    //   }
    //   return false;
    // });
  },

  componentDidMount() {
    _.forEach(_.keys(this.state), (key) => {
      // AsyncStorage.getItem(key)
        // .then((value) => {console.log("load key, value: ", key, value); this.setState({key: value})})
    });
  },

  componentDidUpdate(prevProps, prevState) {
    _.forIn(this.state, (value, key) => {
      if (value != null && key != null && value != initialState[key] && value != prevState[key]) {
        console.log("set key, value: ", key, value);
        // AsyncStorage.setItem(key, value);
      }
    })
  },

  getLocation() {
    // TODO: where does navigator come from?
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({location: initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },

  handleAroundChange(event) {
    this.setState({aroundCount: event.newCount})
  },

  handleEmergencyReceived(event) {
    this.setState({
      receivedEmergency: true,
      receivedEmergencyText: event.message
    })
  },

  handleLocationReceived(event) {
    this.setState({
      location: {
        lat: event.lat,
        lng: event.lng
      }
    })
  },

  sendMessage() {
    // this.getLocation().then((location) => {
    //   const {latitude, longitude} = location.coords;
    //   NativeModules.P2PKit.setMessage(`no${this.state.emergencyText}|lo${latitude},${longitude}`);
    // });
    // NativeModules.P2PKit.setMessage(`NO${this.state.emergencyText}|lo47.3897774,8.5164106`);
  },

  resetMessage() {
    // NativeModules.P2PKit.resetMessage()
  },

  directTo() {
    const {lat, lng } = this.state.location
    // NativeModules.P2PKit.directTo(47.3897774,8.5164106,lat,lng)
  },
  //
  // handleEnabledChanged(isEnabled) {
  //   this.setState({isEnabled: isEnabled})
  //   if (isEnabled) {
  //     NativeModules.P2PKit.enable()
  //   } else {
  //     NativeModules.P2PKit.disable()
  //   }
  // },

  handleEmergencyClick() {
    if (this.state.emergency) {
      this.resetMessage()
      this.setState({emergency: false})
    } else {
      if (this.state.callEmergencyAutomatically) {
        // NativeModules.P2PKit.phoneCall(this.state.number)
      }
      this.sendMessage()
      this.setState({emergency: true})
    }
  },

  showSettings() {
    this.setState({showSettings: true})
  },

  hideSettings() {
    this.setState({showSettings: false})
  },

  dismissModal() {
    this.setState({receivedEmergency: false})
  },

  accept() {
    this.directTo();
    // NativeModules.P2PKit.setMessage(`OT`);
  },

  render() {
    const settingsView =
      <SettingsView
      hideSettings={this.hideSettings}
      onChangeNumber={number => this.setState({number})}
      phoneNumber={this.state.number}
      shouldCallEmergencyAutomatically={this.state.callEmergencyAutomatically}
      onChangeShouldCallEmergencyAutomatically={callEmergencyAutomatically => this.setState({callEmergencyAutomatically})}
      emergencyText={this.state.emergencyText}
      onChangeEmergencyText={emergencyText => this.setState({emergencyText})} />

    const emergencyView =
      <EmergencyView
        showSettings={this.showSettings}
        isEmergency={this.state.emergency}
        receivedEmergency={this.state.receivedEmergency}
        aroundCount={this.state.aroundCount}
        handleEmergencyClick={this.handleEmergencyClick}
        receivedEmergencyText={this.state.receivedEmergencyText}
        onAcceptEmergencyCall={this.acceptEmergencyCall}
        onDismissEmergencyCall={this.dismissModal} />

    return this.state.showSettings ? settingsView : emergencyView;
  }
})

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

AppRegistry.registerComponent('HelperNet', () => HelperNet)
