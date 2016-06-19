package com.zwd51.packages;

import android.app.Activity;
import android.util.Log;

import com.alibaba.sdk.android.AlibabaSDK;
import com.alibaba.sdk.android.login.LoginService;
import com.alibaba.sdk.android.login.callback.LoginCallback;
import com.alibaba.sdk.android.session.model.Session;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Connor on 6/19/16.
 */
public class AlibabaAPIModule extends ReactContextBaseJavaModule {

    private Activity mainActivity;

    public AlibabaAPIModule(ReactApplicationContext reactContext, Activity mainActivity) {
        super(reactContext);
        this.mainActivity = mainActivity;
    }

    @Override
    public String getName() {
        return "AlibabaAPI";
    }

    @ReactMethod
    public void login() {
        LoginService loginService = AlibabaSDK.getService(LoginService.class);
        loginService.showLogin(mainActivity, new LoginCallback() {
            @Override
            public void onSuccess(Session session) {
                Log.i("AlibabaAPIModule", "onSuccess: "+session.isLogin()+"-UserId-" + session.getUserId() + "-LoginTime-"+ session.getLoginTime()+"[user]:nick="+session.getUser().nick + "头像"+ session.getUser().avatarUrl);
            }

            @Override
            public void onFailure(int code, String message) {
                Log.e("AlibabaAPIMoudle", "onFailure: "+code+message);
            }
        });

    }

}
