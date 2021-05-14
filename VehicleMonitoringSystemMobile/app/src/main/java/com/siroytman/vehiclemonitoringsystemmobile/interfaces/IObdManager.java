package com.siroytman.vehiclemonitoringsystemmobile.interfaces;

import com.siroytman.vehiclemonitoringsystemmobile.model.VehicleData;

public interface IObdManager {
    void onObdDataUpdate(VehicleData vehicleData);
}
