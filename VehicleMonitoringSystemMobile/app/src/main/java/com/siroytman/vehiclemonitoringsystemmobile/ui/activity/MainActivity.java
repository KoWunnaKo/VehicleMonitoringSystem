package com.siroytman.vehiclemonitoringsystemmobile.ui.activity;

import android.os.Bundle;
import android.widget.Button;
import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationForegroundService;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    public static final String TAG = "MainActivity";

    Button btnStartTrack;

    private boolean isLocating;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnStartTrack = findViewById(R.id.btn_start_track);
        isLocating = false;

        btnStartTrack.setOnClickListener(v -> {
            isLocating = !isLocating;
            if (isLocating) {
                btnStartTrack.setText(R.string.main_activity__track_button__stop);
                LocationForegroundService.startService(getApplicationContext());
            } else
            {
                btnStartTrack.setText(R.string.main_activity__track_button__start);
                LocationForegroundService.stopService(getApplicationContext());
            }
        });
    }
}