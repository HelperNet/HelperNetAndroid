//
//  P2PKitService.m
//  HelperNet
//
//  Created by Sven Mischkewitz on 14/10/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "P2PKitService.h"

@implementation P2PKitService

static NSString *const API_KEY = @"eyJzaWduYXR1cmUiOiJieXBGVEtaR1NVNVAzWW56ZmlDMDZ5TnRnRDZTVGRLbWNGQTFpYlpWVllCWGVpUllIazEvbEVpcG8xZVJzMTlyaW5Mb1VFNU53c3ozSk5xNkpYT0hwUVQ0YSthc1RWbHNJM3ZPS3dsOGhSZ2dzNE9zb09FUGY1UmdHZU9raEkvZHoxUzdvWGN3bUxScW45dVAydkF5NWI4anZYZ2xHZ2paajZ6YVBuVTFmb2M9IiwiYXBwSWQiOjEyODgsInZhbGlkVW50aWwiOjE2ODAwLCJhcHBVVVVJRCI6IkQ3MkIxNUM0LThGRjMtNEVDRi04RjY4LUIwQzhBNjEwRkRFMSJ9";

static BOOL isEnabled = false;


#pragma Delegate Methods

-(void)PPKControllerInitialized {}

-(void)p2pPeerDiscovered: (PPKPeer*)peer {
  NSString *discoveryInfoString = [[NSString alloc] initWithData:peer.discoveryInfo encoding:NSUTF8StringEncoding];
  
  if (_discoveredCallback != nil) {
    [_p2pKitModule performSelector:_discoveredCallback withObject:peer.peerID withObject: discoveryInfoString];
  }
}

-(void)p2pPeerLost: (PPKPeer*)peer {
  if (_lostCallback != nil) {
    [_p2pKitModule performSelector:_lostCallback withObject:peer.peerID];
  }
}

-(void)didUpdateP2PDiscoveryInfoForPeer: (PPKPeer*)peer {
  NSString *discoveryInfo = [[NSString alloc] initWithData:peer.discoveryInfo encoding:NSUTF8StringEncoding];
  if (_didUpdateCallback != nil) {
    [_p2pKitModule performSelector:_didUpdateCallback withObject:peer.peerID withObject:discoveryInfo];
  }
}

-(void)p2pDiscoveryStateChanged: (PPKPeer2PeerDiscoveryState)state {
  // get state string
  NSString *discoveryState;
  if (state == PPKPeer2PeerDiscoveryStopped) {
    discoveryState = @"stopped";
  } else if (state == PPKPeer2PeerDiscoverySuspended) {
    discoveryState = @"suspended";
  } else if (state == PPKPeer2PeerDiscoveryRunning) {
    discoveryState = @"running";
  }
  
  if (_stateChangedCallback != nil) {
    [_p2pKitModule performSelector:_stateChangedCallback withObject:discoveryState];
  }
}


#pragma Instance Methods

-(void)enableKit {
  if (isEnabled) {
    return;
  }
    
  [PPKController enableWithConfiguration:API_KEY observer:self];
  isEnabled = true;
}

-(void)disableKit {
  if (isEnabled) {
    return;
  }
  
  [PPKController disable];
  isEnabled = false;
}

-(void)startDiscovery {
  [PPKController startP2PDiscovery];
}

-(void)startDiscoveryWithInfo: (NSData *)info {
  [PPKController startP2PDiscoveryWithDiscoveryInfo: info];
}

-(void)stopDiscovery {
  [PPKController stopP2PDiscovery];
}

-(void)pushDiscoveryInfo: (NSData*)info {
  [PPKController pushNewP2PDiscoveryInfo: info];
}

#pragma Singleton Methods

+(id)sharedService {
  static P2PKitService *sharedService = nil;
  static dispatch_once_t onceToken;
  
  dispatch_once(&onceToken, ^{
    sharedService = [[self alloc] init];
  });
  
  return sharedService;
}

-(id)init {
  self = [super init];
  return self;
}

- (void)dealloc {
  // Should never be called, but just here for clarity really.
}

@end
