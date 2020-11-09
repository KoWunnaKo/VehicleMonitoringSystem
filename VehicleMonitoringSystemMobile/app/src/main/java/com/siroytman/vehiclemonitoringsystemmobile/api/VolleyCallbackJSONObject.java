package com.siroytman.vehiclemonitoringsystemmobile.api;

import com.android.volley.VolleyError;

import org.json.JSONObject;

public interface VolleyCallbackJSONObject {
    void onSuccessResponse(JSONObject result);
    void onErrorResponse(VolleyError error);
}
