package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.VolleyError;
import com.siroytman.vehiclemonitoringsystemmobile.api.ApiController;
import com.siroytman.vehiclemonitoringsystemmobile.api.VolleyCallbackJSONArray;
import com.siroytman.vehiclemonitoringsystemmobile.controller.AppController;
import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;
import com.siroytman.vehiclemonitoringsystemmobile.room.AppRoomDatabase;

import org.json.JSONArray;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class VehicleDataSynchronizationService {
    public static final String TAG = "DataSyncService";
    private static final int TIME_INTERVAL = 100000;
    private static boolean isSynchronizationTaskScheduled = false;

    public static void scheduleSynchronizationTask() {
        if (!isSynchronizationTaskScheduled) {
            isSynchronizationTaskScheduled = true;
            Log.d(TAG, "VehicleDataSynchronizationService started");
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    if (isNetworkConnected()) {
                        AppRoomDatabase roomDb = AppController.getInstance().getRoomDatabase();
                        List<VehicleData> vehicleDataList = roomDb.vehicleDataDao().getAll();
                        JSONArray vehicleDataArray = new JSONArray(vehicleDataList);

                        if (vehicleDataList.size() == 0) {
                            Log.d(TAG, "VehicleDataList.size = 0. Return");
                            return;
                        }

                        ApiController.getInstance()
                                .getJSONArrayResponse(Request.Method.POST, "", vehicleDataArray, new VolleyCallbackJSONArray() {
                                    @Override
                                    public void onSuccessResponse(JSONArray result) {
                                        roomDb.vehicleDataDao().deleteAll(vehicleDataList);
                                        Log.d(TAG, "List with size = " + vehicleDataList.size() + " synced with server");
                                    }
                                    @Override
                                    public void onErrorResponse(VolleyError error) {
                                        Log.d(TAG, "Volley error = " + error.getMessage());
                                    }
                                });
                    }
                }
            }, TIME_INTERVAL);
        }
    }

    private static boolean isNetworkConnected() {
        Context context = AppController.getInstance().getAppContext();
        ConnectivityManager cm = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
        return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
    }
}
