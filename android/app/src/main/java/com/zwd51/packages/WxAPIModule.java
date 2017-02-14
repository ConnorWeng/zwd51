package com.zwd51.packages;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;

/**
 * Created by Connor on 10/02/17.
 */
public class WxAPIModule extends ReactContextBaseJavaModule {
    private IWXAPI wxapi;

    public WxAPIModule(ReactApplicationContext reactContext, IWXAPI wxapi) {
        super(reactContext);
        this.wxapi = wxapi;
    }

    @Override
    public String getName() {
        return "WxAPI";
    }

    @ReactMethod
    public void shareToWxTimeline(String url, String title, String imageUrl, Callback successCallback, Callback errorCallback) {
        WXWebpageObject webpage = new WXWebpageObject();
        webpage.webpageUrl = url;
        WXMediaMessage msg = new WXMediaMessage(webpage);
        msg.title = title;

        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("webpage");
        req.message = msg;
        req.scene = SendMessageToWX.Req.WXSceneTimeline;
        wxapi.sendReq(req);
    }

    private String buildTransaction(final String type) {
        return (type == null) ? String.valueOf(System.currentTimeMillis()) : type + System.currentTimeMillis();
    }
}
