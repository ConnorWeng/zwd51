package com.zwd51;

import android.content.Intent;
import android.os.Bundle;

import com.alibaba.sdk.android.callback.CallbackContext;
import com.facebook.react.ReactActivity;
import com.loveplusplus.update.UpdateChecker;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "zwd51";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        CallbackContext.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        UpdateChecker.checkForDialog(MainActivity.this);
    }
}
