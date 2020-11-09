package com.siroytman.vehiclemonitoringsystemmobile.api;

import android.util.Log;

import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.siroytman.vehiclemonitoringsystemmobile.BuildConfig;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;

import org.json.JSONArray;
import org.json.JSONObject;

public class ApiController {
    public static final String TAG = "ApiController";
    private static final String serverUrl;

    // Volley queue for executing requests to server
    private VolleyQueue volleyQueue;

    // A singleton instance of the application class for easy access in other places
    private static ApiController instance;

    static {
        // Choosing server url
        int serverUrlId = R.string.server_url;
        serverUrl = AppController.getContext().getString(serverUrlId);
    }

    private ApiController() {
        // initialize the singleton
        instance = this;
        // initialize volley queue
        volleyQueue = new VolleyQueue(AppController.getContext());
    }

    /**
     * @return ApplicationController singleton instance
     */
    public static synchronized ApiController getInstance() {
        if (instance == null) {
            instance = new ApiController();
        }
        return instance;
    }


    /**
     * Returns string response from server
     * @param method restMethod: GET, POST, ... {@link com.android.volley.Request.Method}
     * @param apiUrl api address
     * @param callback function to call when got response
     */
    public void getStringResponse(int method, String apiUrl, final VolleyCallbackString callback) {
        StringRequest request = new StringRequest(method,
                serverUrl + "/" + apiUrl,
        new Response.Listener <String> () {
            @Override
            public void onResponse(String response) {
                callback.onSuccessResponse(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError e) {
                Log.d(TAG, "Error: " + e.toString());
            }
        });

        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return 50000;
            }

            @Override
            public int getCurrentRetryCount() {
                return 50000;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });
        volleyQueue.addToRequestQueue(request);
    }

    public void getJSONObjectResponse(String apiUrl, JSONObject json, final VolleyCallbackJSONObject callback) {
        JsonObjectRequest request = new JsonObjectRequest(serverUrl + "/" + apiUrl,
                json,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        callback.onSuccessResponse(response);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError e) {
                callback.onErrorResponse(e);
                Log.d(TAG, "Error: " + e.toString());
            }
        });

        volleyQueue.addToRequestQueue(request);

        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return 50000;
            }

            @Override
            public int getCurrentRetryCount() {
                return 50000;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });
    }

    public void getJSONArrayResponse(int method, String apiUrl, JSONArray json, final VolleyCallbackJSONArray callback) {
        JsonArrayRequest request = new JsonArrayRequest(method, serverUrl + "/" + apiUrl,
                json,
                new Response.Listener<JSONArray> () {
                    @Override
                    public void onResponse(JSONArray response) {
                        callback.onSuccessResponse(response);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError e) {
                callback.onErrorResponse(e);
                Log.d(TAG, "Error: " + e.toString());
            }
        });

        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return 50000;
            }

            @Override
            public int getCurrentRetryCount() {
                return 50000;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });

        volleyQueue.addToRequestQueue(request);
    }

}