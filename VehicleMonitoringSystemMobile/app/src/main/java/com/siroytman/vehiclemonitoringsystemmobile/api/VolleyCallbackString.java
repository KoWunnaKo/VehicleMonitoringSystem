package com.siroytman.vehiclemonitoringsystemmobile.api;

import com.android.volley.VolleyError;

public interface VolleyCallbackString
{
    void onSuccessResponse(String result);
    void onErrorResponse(VolleyError error);
}
