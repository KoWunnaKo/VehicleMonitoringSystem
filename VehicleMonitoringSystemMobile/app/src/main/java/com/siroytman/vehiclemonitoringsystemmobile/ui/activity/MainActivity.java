package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.services.ILocationManager;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationService;

import java.util.Locale;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements ILocationManager {
    public static final String TAG = "MainActivity";

    TextView tvLatitude;
    TextView tvLongitude;
    Button btnStartTrack;

    private LocationService locationService;
    private Location lastLocation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvLatitude = findViewById(R.id.latitude);
        tvLongitude = findViewById(R.id.longitude);
        btnStartTrack = findViewById(R.id.btn_start_track);

        btnStartTrack.setOnClickListener(v -> {
            locationService = new LocationService(MainActivity.this, MainActivity.this);
            locationService.startLocationUpdates();
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (locationService != null) {
            locationService.startLocationUpdates();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (locationService != null) {
            locationService.stopLocationUpdates();
        }
    }

    @Override
    public void getLastKnownLocation(Location lastLocation) {
        if (lastLocation != null) {
            this.lastLocation = lastLocation;
            updateViews();
        }
    }

    @Override
    public void onLocationChanged(Location location) {
        if (location != null) {
            lastLocation = location;
            updateViews();
        }
    }

    private void updateViews() {
        if (lastLocation != null) {
            String latitudeText = String.format(Locale.getDefault(), "Latitude - %f", lastLocation.getLatitude());
            tvLatitude.setText(latitudeText);
            Log.d(TAG, latitudeText);

            String longitudeText = String.format(Locale.getDefault(), "Longitude - %f", lastLocation.getLongitude());
            tvLongitude.setText(longitudeText);
            Log.d(TAG, longitudeText);
        }
        else {
            Log.d(TAG, "Null location");
        }
    }
}