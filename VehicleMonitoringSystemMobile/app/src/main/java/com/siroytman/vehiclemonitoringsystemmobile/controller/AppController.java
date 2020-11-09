package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.app.Application;
import android.content.Context;
import com.siroytman.vehiclemonitoringsystemmobile.model.AppUser;

public class AppController extends Application {
    private static final String TAG = "AppController";

    public static AppUser user;
    public static Context getContext() {
        return mInstance.getApplicationContext();
    }

    private static AppController mInstance;

    public static synchronized AppController getInstance() {
        return mInstance;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        mInstance = this;
    }

}