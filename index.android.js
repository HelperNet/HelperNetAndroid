/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native')
var _ = require('lodash')
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter')
var Subscribable = require('Subscribable')
var styles = require('./stylesheet')

var {
  AppRegistry,
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
      NativeModules.P2PKit.enable()
    }

    this.addListenerOn(RCTDeviceEventEmitter,
                   'aroundCountChanged',
                   this.handleAroundChange)

    this.addListenerOn(RCTDeviceEventEmitter,
                   'emergencyReceived',
                   this.handleEmergencyReceived)

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
    NativeModules.P2PKit.setMessage(`NO${this.state.emergencyText}|lo47.3897774,8.5164106`);
  },

  resetMessage() {
    NativeModules.P2PKit.resetMessage()
  },

  directTo() {
    const {lat, lng } = this.state.location
    NativeModules.P2PKit.directTo(47.3897774,8.5164106,lat,lng)
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
        NativeModules.P2PKit.phoneCall(this.state.number)
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
    NativeModules.P2PKit.setMessage(`OT`);
  },

  render() {

    const settings = (
      <View style={styles.rootContainer}>
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.backButtonTouch}
            onPress={this.hideSettings}>
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
              onChangeText={(number) => this.setState({number})}
              underlineColorAndroid='#5a5a5a'
              value={this.state.number} />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>
              Call Emergency Number automatically
            </Text>
            <SwitchAndroid
             onValueChange={(value) => this.setState({callEmergencyAutomatically: value})}
             style={styles.switch}
             value={this.state.callEmergencyAutomatically}
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
              onChangeText={(emergencyText) => this.setState({emergencyText})}
              underlineColorAndroid='#5a5a5a'
              value={this.state.emergencyText}
              multiline={true}
              numberOfLines={4} />
          </View>


          <View style={styles.aroundCountContainer}>
            <Text style={styles.copyrightText}>
              &copy; 2015 Nerdish by Nature
            </Text>
          </View>
        </ScrollView>
      </View>
    )

    const modal = (
      <View style={styles.emergencyReceivedContainer}>
        <Text style={styles.emergencyReceivedText}>
          There is an emergency nearby and you can help! {'\n\n'}
          { this.state.receivedEmergencyText }
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={styles.emergencyReceivedButton}
            onPress={this.accept}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyReceivedButtonText}>Route there</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.emergencyReceivedButton}
            onPress={this.dismissModal}
            underlayColor='#ff0000'>
            <Text style={styles.emergencyReceivedButtonText}>Dismiss</Text>
          </TouchableHighlight>
        </View>
      </View>
    )

    const EmergencyViewContent = (
      <View style={styles.backgroundContainer}>
        <Image
          style={styles.circles}
          source={require('image!background_circles')} />
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.emergencyButton}
            onPress={this.handleEmergencyClick}
            underlayColor='#EC407A'>
            <Text style={styles.emergencyButtonText}>{ this.state.emergency ? "Abort" : "Broadcast Emergency"}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.aroundCountWrapper}>
          <Text style={styles.aroundCountText}>
            {this.state.aroundCount} people nearby.
          </Text>
        </View>
      </View>
    )

    const EmergencyView = (
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
        { this.state.receivedEmergency ? modal : EmergencyViewContent }
      </View>
    )

    return this.state.showSettings ? settings : EmergencyView
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
