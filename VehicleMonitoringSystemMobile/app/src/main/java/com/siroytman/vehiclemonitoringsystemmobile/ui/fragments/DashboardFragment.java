package com.siroytman.vehiclemonitoringsystemmobile.ui.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.siroytman.vehiclemonitoringsystemmobile.R;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;


public class DashboardFragment extends Fragment {

    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_dashboard, container, false);
    }
}