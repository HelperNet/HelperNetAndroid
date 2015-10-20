const React = require('react-native')
const Switch = React.createClass({
  render() {
    return (
      <React.SwitchAndroid
        onTintColor='#ff0000'
        thumbTintColor='#ff0000'
        tintColor='#ff0000'
        {...this.props} />
    )
  }
})

module.exports = Switch
