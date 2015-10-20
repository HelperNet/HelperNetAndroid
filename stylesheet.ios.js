var React = require('react-native')
var { StyleSheet } = React

module.exports = StyleSheet.create({
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
    flex: 1,
    marginTop: 20
  },
  toolbarTitle: {
    width: 100,
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20
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
    width: 200
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
    flex: 1,
    marginTop: 15
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
    borderRadius: 90,
    backgroundColor: '#F50057',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 160,
    marginLeft: 10
  },
  circlesWrapper: {
    justifyContent: 'center',
  },
  circles: {
    height: 0, // 550
    width: 0, // 550
    position: 'absolute',
    // bottom: 20,
    // right: 0
  }
})
