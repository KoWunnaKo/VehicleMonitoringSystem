package com.siroytman.vehiclemonitoringsystemmobile.controller;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONObject;
import com.siroytman.vehiclemonitoringsystemmobile.model.Employee;
import com.siroytman.vehiclemonitoringsystemmobile.ui.activity.AuthActivity;

import org.json.JSONObject;


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
    public void configureCurrentDbUser(AuthActivity authActivity, boolean isSilentLogin) {
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
                                if (user == null) {
                                    String msg = "User with id = " + firebaseUserId + " was not found in database";
                                    throw new IllegalArgumentException(msg);
                                }

                                AppController.getInstance().setDbUser(user);
                                if (user.isDriverRole()) {
                                    authActivity.startSignedInActivity();
                                } else {
                                    if (!isSilentLogin) {
                                        authActivity.showSignInError(R.string.signed_in_role_error);
                                    }
                                }
                            }

                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.d(TAG, "Current db user not recieved: " + error.getMessage());
                            }
                        }
                );
    }
}
