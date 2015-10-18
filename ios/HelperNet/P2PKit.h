//
//  P2PKit.h
//  HelperNet
//
//  Created by Sven Mischkewitz on 14/10/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#ifndef P2PKit_h
#define P2PKit_h

#import "RCTBridgeModule.h"
#import "P2PKitService.h"

@interface P2PKit : NSObject <RCTBridgeModule>

@property P2PKitService *sharedService;

@end


#endif /* P2PKit_h */
