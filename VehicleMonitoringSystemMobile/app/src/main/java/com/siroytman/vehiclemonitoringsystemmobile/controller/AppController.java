package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.app.Application;
import android.content.Context;

import androidx.room.Room;

import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.room.AppRoomDatabase;

public class AppController extends Application {
    private static final String TAG = "AppController";
    private Employee dbUser;
    private static AppController mInstance;
    private AppRoomDatabase roomDatabase;

    @Override
    public void onCreate() {
        super.onCreate();

        roomDatabase = Room
                .databaseBuilder(getApplicationContext(), AppRoomDatabase.class, "vms-room")
                .fallbackToDestructiveMigration()
                .build();
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

    public AppRoomDatabase getRoomDatabase() {
        return roomDatabase;
    }

    public Context getAppContext() {
        return getApplicationContext();
    }

    public Employee getDbUser() {
        return dbUser;
    }

    public void setDbUser(Employee user) {
        this.dbUser = user;
    }
}