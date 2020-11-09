package com.siroytman.vehiclemonitoringsystemmobile.api;

import com.android.volley.VolleyError;

import org.json.JSONArray;

public interface VolleyCallbackJSONArray {
    void onSuccessResponse(JSONArray result);
    void onErrorResponse(VolleyError error);
}
