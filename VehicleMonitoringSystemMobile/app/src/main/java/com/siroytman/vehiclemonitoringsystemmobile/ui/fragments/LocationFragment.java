package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.siroytman.vehiclemonitoringsystemmobile.R;
import com.siroytman.vehiclemonitoringsystemmobile.controller.CompanySettingsController;
import com.siroytman.vehiclemonitoringsystemmobile.services.LocationForegroundService;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class LocationFragment extends Fragment {
    private static final String TAG = "LocationFragment";
    private Context context;
    private View rootView;
    private Button btnStartTrack;
    private boolean isLocating = false;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_location, container, false);
        context = getActivity();

        btnStartTrack = rootView.findViewById(R.id.location__btn_start_track);

        btnStartTrack.setOnClickListener(v -> {
            if (!isLocating) {
                btnStartTrack.setText(R.string.location__track_button__stop);
                LocationForegroundService.startService(context);
            } else
            {
                if (!LocationForegroundService.checkPermissions(context)) {
                    LocationForegroundService.requestPermissions(getActivity());
                }
                btnStartTrack.setText(R.string.location__track_button__start);
                LocationForegroundService.stopService(context);
            }
            isLocating = !isLocating;
        });

        return rootView;
    }



    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Configure companySettings params
        CompanySettingsController.getInstance().configureCompanySettings();
    }
}