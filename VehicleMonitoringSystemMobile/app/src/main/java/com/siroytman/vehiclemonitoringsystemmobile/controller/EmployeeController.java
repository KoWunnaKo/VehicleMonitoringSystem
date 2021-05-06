package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.model.CompanySettings;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationService;
import com.siroytman.vehiclemonitoringsystemmobile.services.VehicleDataSynchronizationService;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.AuthActivity;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.NavigationActivity;

import org.json.JSONObject;

import static androidx.core.content.ContextCompat.startActivity;


public class EmployeeController {
    private static final String TAG = "EmployeeController";
    private final ApiController apiController;

    private static EmployeeController instance;

    private EmployeeController() {
        apiController = ApiController.getInstance();
    }

    public static synchronized EmployeeController getInstance() {
        if (instance == null) {
            instance = new EmployeeController();
        }
        return instance;
    }

    // Gets and sets current dbUser via firebaseAuthUserId
    public void configureCurrentDbUser(AuthActivity authActivity) {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user == null) {
            return;
        }
        String firebaseUserId = user.getUid();

        ApiController.getInstance()
                .getJSONObjectResponse(Request.Method.GET,
                        ApiController.BACKEND_URL,
                        "auth/current/" + firebaseUserId,
                        null,
                        new VolleyCallbackJSONObject() {
                            @Override
                            public void onSuccessResponse(JSONObject result) {
                                Employee user = Employee.parseEmployee(result);
                                AppController.getInstance().setDbUser(user);
                                authActivity.startSignedInActivity();
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.d(TAG, "Current db user not recieved: " + error.getMessage());
                            }
                        }
                );
    }
}
