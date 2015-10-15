//
//  P2PKit.m
//  HelperNet
//
//  Created by Sven Mischkewitz on 14/10/15.
//  Copyright © 2015 Facebook. All rights reserved.
//


#import "P2PKit.h"
#import "RCTEventDispatcher.h"

@implementation P2PKit

@synthesize bridge = _bridge;

- (id)init
{
  self = [super init];
  
  // setup services
  _sharedService = [P2PKitService sharedService];
  _sharedService.p2pKitModule = self;
  _sharedService.stateChangedCallback = @selector(stateChanged:);
  _sharedService.lostCallback = @selector(lost:);
  _sharedService.didUpdateCallback = @selector(didUpdate:with:);
  _sharedService.discoveredCallback = @selector(discovered:with:);
  
  return self;
}


#pragma Event Callbacks

-(void)stateChanged:(NSString*)state {
  [self.bridge.eventDispatcher sendAppEventWithName:@"p2pStateChanged" body:@{@"state": state}];
}

-(void)lost:(NSString*)peerID {
  [self.bridge.eventDispatcher sendAppEventWithName:@"p2pPeerLost" body:@{@"peerID": peerID}];
}

-(void)discovered:(NSString*)peerID with:(NSString*)info {
  [self.bridge.eventDispatcher sendAppEventWithName:@"p2pDiscovered" body:@{@"peerID": peerID, @"info": info}];
}

-(void)didUpdate:(NSString*)peerID with:(NSString*)info {
  [self.bridge.eventDispatcher sendAppEventWithName:@"p2pDidUpdate" body:@{@"peerID": peerID, @"info": info}];
}


#pragma Module Exports

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(enable)
{
 [_sharedService enableKit];
}

RCT_EXPORT_METHOD(disable)
{
  [_sharedService disableKit];
}

RCT_EXPORT_METHOD(startDiscovery)
{
  [_sharedService startDiscovery];
}

RCT_EXPORT_METHOD(startDiscoveryWithInfo:(NSString*) stringData)
{
  NSData *data = [stringData dataUsingEncoding:NSUTF8StringEncoding];
  [_sharedService startDiscoveryWithInfo:data];
}

RCT_EXPORT_METHOD(stopDiscovery)
{
  [_sharedService stopDiscovery];
}

RCT_EXPORT_METHOD(pushDiscoveryInfo:(NSString*) stringData)
{
  NSData *data = [stringData dataUsingEncoding:NSUTF8StringEncoding];
  [_sharedService pushDiscoveryInfo:data];
}

@end