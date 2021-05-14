package com.siroytman.vehiclemonitoringsystemmobile.interfaces;

import android.location.Location;

public interface ILocationManager {

//    void getLastKnownLocation(Location lastLocation);

    void onLocationChanged(Location location);

}
