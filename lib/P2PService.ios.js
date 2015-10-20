const React = require('react-native')
const EventEmitter = require('EventEmitter')
const {
  NativeAppEventEmitter,
  NativeModules
} = React

const {
  P2PKit
} = NativeModules

const DEFAULT_MESSAGE = 'ok'
const eventEmitter = new EventEmitter()

let nearbyCount = 0

// HELPERS

function handleMessage({ peerId, info }) {
  const chunks = info.split('|')

  chunks.forEach(chunk => {
    let prefix = chunk
    let payload = ''

    if (chunk.length > 0) {
      prefix = chunk.substring(0, 2)
      payload = part.substring(2)
    }

    switch (prefix) {
      case 'NO':
        console.debug('emergency NOtification')
        eventEmitter.emit('emergencyReceived', { peerId, message: payload })
        break

      case 'LO':
        console.debug('receive LOcation')
        const locationStrings = payload.split(',')

        const lat = parseFloat(locationStrings[0])
        const lng = parseFloat(locationStrings[1])
        eventEmitter.emit('location', { peerId, lat, lng })
        break

      case 'OK':
        console.debug('default state')
        break

      default:
        console.error('unkown state prefix')
    }
  })
}

function increaseNearbyCount() {
  nearbyCount++
}

function decreaseNearbyCount() {
  nearbyCount--
}

function notifyNearbyCountChange() {
  eventEmitter.emit('aroundCountChanged', nearbyCount)
}


const P2PService = {
  // REACT LIFECYCLE

  componentWillMount() {
    eventEmitter.on('p2pDidUpdate', handleMessage)
    eventEmitter.on('p2pDiscovered', increaseNearbyCount)
    eventEmitter.on('p2pPeerLost', decreaseNearbyCount)
  }

  // API

  enable() {
    P2PKit.enable()
  },

  disable() {
    P2PKit.disable()
  },

  startDiscovery(message = null) {
    if ('string' !== typeof message) {
      P2PKit.startDiscovery()
    } else {
      P2PKit.startDiscoveryWithInfo(message)
    }
  },

  stopDiscovery() {
    P2PKit.stopDiscovery()
  },

  sendMessage(message) {
    P2PKit.pushDiscoveryInfo(message)
  },

  resetMessage() {
    this.sendMessage(DEFAULT_MESSAGE)
  }
}

module.exports = P2PService
