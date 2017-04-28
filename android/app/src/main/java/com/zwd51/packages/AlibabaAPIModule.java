package com.zwd51.packages;

import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.alibaba.sdk.android.AlibabaSDK;
import com.alibaba.sdk.android.login.LoginService;
import com.alibaba.sdk.android.login.callback.LoginCallback;
import com.alibaba.sdk.android.session.model.Session;
import com.alibaba.sdk.android.session.model.User;
import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

/**
 * Created by Connor on 6/19/16.
 */
public class AlibabaAPIModule extends ReactContextBaseJavaModule {

    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_AUTH_FLAG = 2;

    public AlibabaAPIModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AlibabaAPI";
    }

    @ReactMethod
    public void login(final Callback successCallback, final Callback errorCallback) {
        LoginService loginService = AlibabaSDK.getService(LoginService.class);
        loginService.showLogin(getCurrentActivity(), new LoginCallback() {
            @Override
            public void onSuccess(Session session) {
                Log.i("AlibabaAPIModule", "onSuccess: "+session.isLogin()+"-UserId-" + session.getUserId() + "-LoginTime-"+ session.getLoginTime()+"[user]:nick="+session.getUser().nick + "头像"+ session.getUser().avatarUrl);
                User user = session.getUser();
                successCallback.invoke(
                        user.id,
                        user.nick,
                        user.avatarUrl,
                        session.getAuthorizationCode());
            }

            @Override
            public void onFailure(int code, String message) {
                Log.e("AlibabaAPIMoudle", "onFailure: "+code+message);
                errorCallback.invoke(code, message);
            }
        });

    }

    @ReactMethod
    public void pay(final String orderInfo, final Callback successCallback, final Callback errorCallback) {
        final Handler handler = new Handler() {
            @SuppressWarnings("unused")
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case SDK_PAY_FLAG: {
                        @SuppressWarnings("unchecked")
                        PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                        /**
                         对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                         */
                        String resultInfo = payResult.getResult();// 同步返回需要验证的信息
                        String resultStatus = payResult.getResultStatus();
                        // 判断resultStatus 为9000则代表支付成功
                        if (TextUtils.equals(resultStatus, "9000")) {
                            // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
                            Toast.makeText(getCurrentActivity(), "支付成功", Toast.LENGTH_SHORT).show();
                            successCallback.invoke();
                        } else {
                            // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
                            Toast.makeText(getCurrentActivity(), "支付失败", Toast.LENGTH_SHORT).show();
                            errorCallback.invoke("支付失败:" + payResult.getResultStatus());
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        };
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                PayTask alipay = new PayTask(getCurrentActivity());
                Map<String, String> result = alipay.payV2(orderInfo, true);
                Log.i("msp", result.toString());

                Message msg = new Message();
                msg.what = SDK_PAY_FLAG;
                msg.obj = result;
                handler.sendMessage(msg);
            }
        };
        Thread payThread = new Thread(runnable);
        payThread.start();
    }

}
