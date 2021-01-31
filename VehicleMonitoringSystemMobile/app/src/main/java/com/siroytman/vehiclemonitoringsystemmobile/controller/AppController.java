package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.app.Application;
import android.content.Context;

import com.siroytman.vehiclemonitoringsystemmobile.model.AppUser;

public class AppController extends Application {
    private static final String TAG = "AppController";
    public AppUser user;
    private static AppController mInstance;

    @Override
    public void onCreate() {
        super.onCreate();

        mInstance = this;
    }

    public static synchronized AppController getInstance() {
        if (mInstance == null) {
            return new AppController();
        }
        else {
            return mInstance;
        }
    }

    public Context getAppContext() {
        return getApplicationContext();
    }
}