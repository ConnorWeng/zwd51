package com.zwd51;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.alibaba.sdk.android.AlibabaSDK;
import com.alibaba.sdk.android.callback.CallbackContext;
import com.alibaba.sdk.android.callback.InitResultCallback;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.loveplusplus.update.UpdateChecker;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.zwd51.packages.AlibabaAPIPackage;
import com.zwd51.packages.WxAPIPackage;
import com.zwd51.packages.Zwd51APIPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    private static final String WX_APP_ID = "wx3763b26efb070ca6";

    private IWXAPI wxapi;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "zwd51";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        if (wxapi == null) {
            regToWx();
        }
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new VectorIconsPackage(),
            new RCTSwipeRefreshLayoutPackage(),
            new AlibabaAPIPackage(MainActivity.this),
            new WebViewBridgePackage(),
            new Zwd51APIPackage(),
            new WxAPIPackage(wxapi)
        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        AlibabaSDK.asyncInit(this, new InitResultCallback() {
            @Override
            public void onSuccess() {
                Log.i("MainActivity", "onSuccess: SDK success");
            }

            @Override
            public void onFailure(int code, String message) {
                Log.e("MainActivity", "onFailure: SDK fail");
            }
        });

        UpdateChecker.checkForDialog(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        CallbackContext.onActivityResult(requestCode, resultCode, data);
    }

    private void regToWx() {
        wxapi = WXAPIFactory.createWXAPI(this, WX_APP_ID, true);
        boolean success = wxapi.registerApp(WX_APP_ID);
        Log.i("MainActivity", "WxAPI " + success);
    }
}
