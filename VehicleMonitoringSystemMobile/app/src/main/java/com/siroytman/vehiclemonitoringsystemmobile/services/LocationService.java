package com.siroytman.vehiclemonitoringsystemmobile.services;

import android.app.Activity;
import android.location.Location;
import android.util.Log;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.content.pm.PackageManager.PERMISSION_GRANTED;
import static androidx.core.app.ActivityCompat.requestPermissions;
import static androidx.core.content.ContextCompat.checkSelfPermission;

public class LocationService {
    public static final String TAG = "LocationService";

    private static final int UPDATE_INTERVAL_MS = 20000;
    private static final int FASTEST_UPDATE_INTERVAL_MS = 5000;
    private static final int REQUEST_LOCATION = 1234;
    private static final String[] PERMISSIONS = new String[]{ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION};

    private final Activity activity;
    private FusedLocationProviderClient fusedLocationClient;

    private final ILocationManager locationManager;
    private LocationCallback locationCallback;
    private LocationRequest locationRequest;

    public LocationService(Activity activity, ILocationManager locationManager) {
        this.activity = activity;
        this.locationManager = locationManager;
        if (fusedLocationClient == null) {
            fusedLocationClient = LocationServices.getFusedLocationProviderClient(activity);
        }

        createLocationRequest();
        createLocationCallBack();
    }

    private void createLocationCallBack() {
        if (locationCallback == null) {
            locationCallback = new LocationCallback() {
                @Override
                public void onLocationResult(LocationResult locationResult) {
                    super.onLocationResult(locationResult);
                    if (locationResult != null) {
                        for (Location location : locationResult.getLocations()) {
                            if (location != null && locationManager != null) {
                                locationManager.onLocationChanged(location);
                            }
                        }
                    }
                }
            };
        }
    }

    private void createLocationRequest() {
        locationRequest = new LocationRequest();
        locationRequest.setInterval(UPDATE_INTERVAL_MS);
        locationRequest.setFastestInterval(FASTEST_UPDATE_INTERVAL_MS);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    public void startLocationUpdates() {
        if (checkSelfPermission(activity, ACCESS_FINE_LOCATION) != PERMISSION_GRANTED
                && checkSelfPermission(activity, ACCESS_COARSE_LOCATION) != PERMISSION_GRANTED) {

            requestPermissions(activity, PERMISSIONS, REQUEST_LOCATION);
            return;
        }

        fusedLocationClient.requestLocationUpdates(locationRequest,
                locationCallback,
                null /* Looper */);
        getLastKnownLocation();
    }

    public void stopLocationUpdates() {
        fusedLocationClient.removeLocationUpdates(locationCallback);
    }

    private void getLastKnownLocation() {
        if (fusedLocationClient == null) {
            fusedLocationClient = LocationServices.getFusedLocationProviderClient(activity);
        }

        if (checkSelfPermission(activity, ACCESS_FINE_LOCATION) != PERMISSION_GRANTED
                && checkSelfPermission(activity, ACCESS_COARSE_LOCATION) != PERMISSION_GRANTED) {
            return;
        }

        fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
            if (location != null) {
                if (locationManager != null) {
                    locationManager.getLastKnownLocation(location);
                }
            }
            else {
                Log.d(TAG, "onSuccess: location is null");
            }
        });
    }
}
