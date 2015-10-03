/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var _ = require('lodash');
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
  AsyncStorage
} = React;

var HelperNet = React.createClass({

  getInitialState() {
    return {
      counter: 0,
      enabled: true,
      number: "+491736353009",
      callEmergencyAutomatically: false,
      isEnabled: true,
      emergencyText: 'Please help me I have an emergency!',
      aroundCount: 0,
      emergency: false,
      receivedEmergency: true
    };
  },

  componentWillMount() {
    if (this.state.enabled) {
      NativeModules.P2PKit.enable();
    }
    NativeModules.P2PKit.registerAroundListener(this.handleAroundChange);
  },

  componentDidMount() {
    _.forEach(_.keys(this.state), (key) => {
      AsyncStorage.getItem(key)
        .then((value) => this.setState({key: value}))
    });
  },

  componentDidUpdate() {
    for (let key in this.state) {
      let value = this.state[key];
      console.log(key, value);
      // AsyncStorage.multiSet([[key, value]], function() {});
    }
  },

  handleAroundChange(aroundCount) {
    this.setState({aroundCount});
  },

  sendMessage() {
    NativeModules.P2PKit.setMessage(this.state.emergencyText + "c" + this.state.counter);
    this.setState({counter: this.state.counter + 1});
  },

  resetMessage() {
    NativeModules.P2PKit.resetMessage();
  },

  directTo() {
    NativeModules.P2PKit.directTo(47.3897774,8.5164106,47.3874417,8.5155475);
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

  render() {

    const youCanHelpView = (
      <View style={styles.emergencyReceivedContainer}>
        <Text>
          There is an emergency nearby and you can help!
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={this.directTo}
          underlayColor='#ff0000'>
          <Text style={styles.buttonText}>Route there</Text>
        </TouchableHighlight>
      </View>
    );

    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>HelperNet {this.state.aroundCount}</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
        {this.state.receivedEmergency ? youCanHelpView : <View />}
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>
              Emergency Number
            </Text>
            <TextInput
              style={{height: 50, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(number) => this.setState({number})}
              underlineColorAndroid='#ff0000'
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
              underlineColorAndroid='#ff0000'
              value={this.state.emergencyText}
              multiline={true}
              numberOfLines={4} />
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleEmergencyClick}
            underlayColor='#ff0000'>
            <Text style={styles.buttonText}>{this.state.emergency ? "Stop calling for help" : "Emgergency"}</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
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
  toolbar: {
    backgroundColor: '#e70000',
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarTitle: {
    width: 100,
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  scrollContainer: {
    flex: 2,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  emergencyReceivedContainer: {
    marginBottom: 15,
    borderColor: '#e70000',
    borderWidth: 3,
    borderRadius: 8,
    padding: 10
  },
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
    flex: 1,
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
  }
});

AppRegistry.registerComponent('HelperNet', () => HelperNet);
