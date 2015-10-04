package com.helpernet;

import android.nfc.Tag;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by nico on 03/10/15.
 */
public class EventEmitterModule {

    private ReactContext reactContext;


    public EventEmitterModule(ReactContext reactContext) {
        this.reactContext = reactContext;
    }

    private void sendEvent(String eventName, WritableMap params, ReactContext reactContext) {
        if (reactContext == null) return;
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void emitAroundChanged(int aroundCount, ReactContext reactContext) {
        WritableMap params = Arguments.createMap();
        params.putInt("newCount", aroundCount);
        this.sendEvent("aroundCountChanged", params, reactContext);
    }

    public void emitEmergency(String message, String id, ReactContext reactContext) {
        WritableMap params = Arguments.createMap();
        params.putString("message", message);
        params.putString("id", id);
        this.sendEvent("emergencyReceived", params, reactContext);
    }

    public void emitLocation(float lat, float lng, String id, ReactContext reactContext) {
        WritableMap params = Arguments.createMap();
        params.putDouble("lat", lat);
        params.putDouble("lng", lng);
        params.putString("id", id);
        this.sendEvent("location", params, reactContext);
    }
}
