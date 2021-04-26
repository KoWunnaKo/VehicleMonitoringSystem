package com.siroytman.vehiclemonitoringsystemmobile.api;

import android.util.Log;

import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;

import org.json.JSONArray;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class ApiController {
    public static final String TAG = "ApiController";
    public static final String GEODATA_PROCESSING_SERVICE_URL;
    public static final String BACKEND_URL;
    private static final int RESPONSE_TIMEOUT = 100000;

    // Volley queue for executing requests to server
    private final VolleyQueue volleyQueue;

    // A singleton instance of the application class for easy access in other places
    private static ApiController instance;

    static {
        GEODATA_PROCESSING_SERVICE_URL = AppController.getInstance().getAppContext().getString(R.string.geodata_processing_service_url);
        BACKEND_URL = AppController.getInstance().getAppContext().getString(R.string.backend_url);
    }

    private ApiController() {
        // initialize the singleton
        instance = this;
        // initialize volley queue
        volleyQueue = new VolleyQueue(AppController.getInstance().getAppContext());
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
     * @param serverUrl server address
     * @param apiUrl api address
     * @param callback function to call when got response
     */
    public void getStringResponse(int method, String serverUrl, String apiUrl, final VolleyCallbackString callback) {
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
        }) {
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                return headers;
            }
        };
        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return RESPONSE_TIMEOUT;
            }

            @Override
            public int getCurrentRetryCount() {
                return RESPONSE_TIMEOUT;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });
        volleyQueue.addToRequestQueue(request);
    }

    public void getJSONObjectResponse(int method, String serverUrl, String apiUrl, JSONObject json, final VolleyCallbackJSONObject callback) {
        JsonObjectRequest request = new JsonObjectRequest(method, serverUrl + "/" + apiUrl,
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
        }) {
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                return headers;
            }
        };
        volleyQueue.addToRequestQueue(request);

        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return RESPONSE_TIMEOUT;
            }

            @Override
            public int getCurrentRetryCount() {
                return RESPONSE_TIMEOUT;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });
    }

    public void getJSONArrayResponse(int method, String serverUrl, String apiUrl, JSONArray json, final VolleyCallbackJSONArray callback) {
        String jsonString = String.valueOf(json);
        JsonArrayRequest request = new JsonArrayRequest(method, serverUrl + "/" + apiUrl,
                json,
                new Response.Listener<JSONArray> () {
                    @Override
                    public void onResponse(JSONArray response) {
                        callback.onSuccessResponse(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError e) {
                        callback.onErrorResponse(e);
                        Log.d(TAG, "Error: " + e.toString());
                    }
        }) {
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                return headers;
            }

            @Override
            public byte[] getBody() {
                return jsonString.getBytes(StandardCharsets.UTF_8);
            }
        };

        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return RESPONSE_TIMEOUT;
            }

            @Override
            public int getCurrentRetryCount() {
                return RESPONSE_TIMEOUT;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });

        volleyQueue.addToRequestQueue(request);
    }

}