package com.helpernet;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.List;
import java.util.ArrayList;

class P2PKitReactPackage implements ReactPackage {

  private MainActivity mActivity;
  public P2PKitReactPackage(MainActivity mActivity) {
      super();
      this.mActivity = mActivity;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<NativeModule>();

    modules.add(new P2PKitModule(reactContext, mActivity));

    return modules;
  }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return new ArrayList<Class<? extends JavaScriptModule>>();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return new ArrayList<ViewManager>();
    }
}
