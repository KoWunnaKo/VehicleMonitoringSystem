package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatDialog;
import com.siroytman.vehiclemonitoringsystemmobile.model.ChatMessage;
import com.siroytman.vehiclemonitoringsystemmobile.model.CompanySettings;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationService;
import com.siroytman.vehiclemonitoringsystemmobile.services.OBDService;
import com.siroytman.vehiclemonitoringsystemmobile.services.VehicleDataSynchronizationService;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.ChatMessagesActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.fragments.ChatDialogFragment;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;


public class CompanySettingsController {
    private static final String TAG = "CompanySettingsControl";
    private final ApiController apiController;

    private static CompanySettingsController instance;

    private CompanySettingsController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized CompanySettingsController getInstance() {
        if (instance == null) {
            instance = new CompanySettingsController();
        }
        return instance;
    }

    // Get and set company settings
    public void configureCompanySettings() {
        int companyId = AppController.getInstance().getDbUser().getCompanyId();

        apiController.getJSONObjectResponse(
                Request.Method.GET,
                ApiController.BACKEND_URL,
                "companySettings/" + companyId,
                null,
                new VolleyCallbackJSONObject() {
                    @Override
                    public void onSuccessResponse(JSONObject result) {
                        CompanySettings companySettings = CompanySettings.parseCompanySettings(result);
                        VehicleDataSynchronizationService.SYNCHRONIZATION_INTERVAL = companySettings.getAndroidIntervalSynchronization();
                        LocationService.RECORDING_INTERVAL_MS = companySettings.getAndroidIntervalRecording();
                        OBDService.RECORDING_INTERVAL_MS = companySettings.getAndroidIntervalRecording();
                        Log.d(TAG, "CompanySettings are applied");
                    }

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, "Volley error = " + error.toString());
                    }
                });
    }
}
