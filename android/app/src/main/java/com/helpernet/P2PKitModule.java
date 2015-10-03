package com.helpernet;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;


public class P2PKitModule extends ReactContextBaseJavaModule {

  MainActivity mActivity;
  static final String DEFAULT_MESSAGE = "ok";

  public P2PKitModule(ReactApplicationContext reactContext, MainActivity mActivity) {
    super(reactContext);
    this.mActivity = mActivity;
  }

  @Override
  public String getName() {
    return "P2PKit";
  }

  @ReactMethod
  public void enable() {
        this.mActivity.getP2PKitService().enableKit();
  }

  @ReactMethod
  public void disable() {
    this.mActivity.getP2PKitService().disableKit();
  }

  @ReactMethod
  public void setMessage(String message) {
     this.mActivity.getP2PKitService().setP2PDiscoveryInfo(message);
  }

  @ReactMethod
  public void resetMessage() {
    this.mActivity.getP2PKitService().setP2PDiscoveryInfo(DEFAULT_MESSAGE);
  }

  @ReactMethod
    public void registerAroundListener(Callback cb) {
      this.mActivity.getP2PKitService().registerAroundListener(cb);
  }

  @ReactMethod
  public void directTo(float fromLat, float fromLng, float toLat, float toLng) {
      this.mActivity.directTo(fromLat, fromLng, toLat, toLng);
  }

  @ReactMethod
  public void phoneCall(String number) {
    this.mActivity.phoneCall(number);
  }
}
