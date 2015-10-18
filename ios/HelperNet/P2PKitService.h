//
//  P2PKitService.h
//  HelperNet
//
//  Created by Sven Mischkewitz on 14/10/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#ifndef P2PKitService_h
#define P2PKitService_h

#import <foundation/Foundation.h>
#import <P2PKit/P2Pkit.h>

@interface P2PKitService : NSObject <PPKControllerDelegate>

// callbacks
@property SEL discoveredCallback;
@property SEL stateChangedCallback;
@property SEL lostCallback;
@property SEL didUpdateCallback;

// module referance for selector perform
@property id p2pKitModule;

// instance
-(void)enableKit;
-(void)disableKit;
-(void)startDiscovery;
-(void)startDiscoveryWithInfo: (NSData*)info;
-(void)stopDiscovery;
-(void)pushDiscoveryInfo: (NSData*)info;

// singletons
+(id)sharedService;

@end

#endif /* P2PKitService_h */
