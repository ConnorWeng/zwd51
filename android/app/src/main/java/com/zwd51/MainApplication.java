package com.zwd51;

import android.app.Application;
import android.util.Log;

import com.alibaba.sdk.android.AlibabaSDK;
import com.alibaba.sdk.android.callback.InitResultCallback;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.zwd51.packages.AlibabaAPIPackage;
import com.zwd51.packages.WxAPIPackage;
import com.zwd51.packages.Zwd51APIPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private IWXAPI wxapi;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            if (wxapi == null) {
                regToWx();
            }
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new AlibabaAPIPackage(),
                    new Zwd51APIPackage(),
                    new WxAPIPackage(wxapi)
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);

        AlibabaSDK.asyncInit(this, new InitResultCallback() {
            @Override
            public void onSuccess() {
                Log.i("MainApplication", "onSuccess: SDK success");
            }

            @Override
            public void onFailure(int code, String message) {
                Log.e("MainApplication", "onFailure: SDK fail");
            }
        });
    }

    private void regToWx() {
        wxapi = WXAPIFactory.createWXAPI(this, Constants.WX_APP_ID, true);
        boolean success = wxapi.registerApp(Constants.WX_APP_ID);
        Log.i("MainApplication", "WxAPI " + success);
    }
}
