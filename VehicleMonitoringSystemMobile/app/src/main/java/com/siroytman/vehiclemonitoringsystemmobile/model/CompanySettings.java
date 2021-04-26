package com.siroytman.vehiclemonitoringsystemmobile.model;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

public class CompanySettings {
    public static final String TAG = "CompanySettings";

    private String companyId;

    private int androidIntervalRecording;

    private int androidIntervalSynchronization;

    public static CompanySettings parseCompanySettings(JSONObject json) {
        CompanySettings companySettings = new CompanySettings();

        try {
            companySettings.companyId = json.getString("companyId");
            companySettings.androidIntervalRecording = json.getInt("androidIntervalRecording");
            companySettings.androidIntervalSynchronization = json.getInt("androidIntervalSynchronization");
        } catch (JSONException e) {
            Log.d(TAG, "Parse error: " + e.getMessage());
            return null;
        }

        return companySettings;
    }

    public int getAndroidIntervalRecording() {
        return this.androidIntervalRecording;
    }

    public int getAndroidIntervalSynchronization() {
        return this.androidIntervalSynchronization;
    }
}
