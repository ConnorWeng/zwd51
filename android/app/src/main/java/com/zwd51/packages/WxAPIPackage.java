package com.zwd51.packages;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.tencent.mm.opensdk.openapi.IWXAPI;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by Connor on 10/02/17.
 */
public class WxAPIPackage implements ReactPackage {
    private IWXAPI wxapi;

    public WxAPIPackage(IWXAPI wxapi) {
        this.wxapi = wxapi;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new WxAPIModule(reactContext, wxapi));
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
