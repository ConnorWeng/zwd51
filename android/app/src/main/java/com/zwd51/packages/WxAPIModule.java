package com.zwd51.packages;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.zwd51.R;
import com.zwd51.Util;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Connor on 10/02/17.
 */
public class WxAPIModule extends ReactContextBaseJavaModule {
    private static final String TAG = "WxAPIModule";
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
    public void shareToWxTimeline(String url, String title, String picUrl) {
        shareToWx(SendMessageToWX.Req.WXSceneTimeline, url, title, picUrl);
    }

    @ReactMethod
    public void shareToWxSession(String url, String title, String picUrl) {
        shareToWx(SendMessageToWX.Req.WXSceneSession, url, title, picUrl);
    }

    private void shareToWx(int scene, String url, String title, String picUrl) {
        WXWebpageObject webpage = new WXWebpageObject();
        webpage.webpageUrl = url;
        WXMediaMessage msg = new WXMediaMessage(webpage);
        msg.title = title;

        Log.d(TAG, "shareToWx: start downloading " + picUrl);
        Bitmap httpGetBitmap = this.getHttpGetBitmap(picUrl);
        Log.d(TAG, "shareToWx: downloaded " + httpGetBitmap.getByteCount());
        if (httpGetBitmap != null) {
            msg.thumbData = Util.compressBitmapToData(httpGetBitmap, 32);
        } else {
            Resources resources = getReactApplicationContext().getResources();
            Bitmap thumb = BitmapFactory.decodeResource(resources, R.mipmap.launcher);
            msg.thumbData = Util.bmpToByteArray(thumb, true);
        }
        Log.d(TAG, "shareToWx: thumb data length is " + msg.thumbData.length);

        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = buildTransaction("webpage");
        req.message = msg;
        req.scene = scene;
        Log.d(TAG, "shareToWx: start sending message to wx");
        wxapi.sendReq(req);
        Log.d(TAG, "shareToWx: sent");
    }

    private String buildTransaction(final String type) {
        return (type == null) ? String.valueOf(System.currentTimeMillis()) : type + System.currentTimeMillis();
    }

    private Bitmap getHttpGetBitmap(String picUrl) {
        Bitmap bitmap = null;
        InputStream in = null;
        try {
            URL url = new URL(picUrl);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setConnectTimeout(5 * 1000);
            urlConnection.setReadTimeout(5 * 1000);
            urlConnection.setRequestProperty( "User-agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4" );
            urlConnection.setInstanceFollowRedirects(false);
            urlConnection.setDoInput(true);
            urlConnection.connect();

            in = urlConnection.getInputStream();
            bitmap = BitmapFactory.decodeStream(in);
            in.close();
        } catch (MalformedURLException e) {
            Log.e(TAG, e.getMessage(), e);
        } catch (IOException e) {
            Log.e(TAG, e.getMessage(), e);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {

                }
            }
        }
        return bitmap;
    }
}
