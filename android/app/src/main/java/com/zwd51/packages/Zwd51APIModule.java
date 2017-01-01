package com.zwd51.packages;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.loveplusplus.update.UpdateDialog;

/**
 * Created by Connor on 02/01/2017.
 */
public class Zwd51APIModule extends ReactContextBaseJavaModule {
    public Zwd51APIModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Zwd51API";
    }

    @ReactMethod
    public void isUpdatingVersion(Callback callback) {
        boolean isUpdating = false;
        if (UpdateDialog.IS_UPDATING) {
            isUpdating = true;
            UpdateDialog.IS_UPDATING = false;
        }
        callback.invoke(isUpdating);
    }
}
